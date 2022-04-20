import kafka from '@kafka-setup/kafka';
import { EachMessagePayload } from 'kafkajs';
import loadConsumer from './loadConsumer';

const consumerService = async (): Promise<void> => {
  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  await consumer.subscribe({
    topic: 'kafka-studies',
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      const log = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      loadConsumer({ log, message });
    },
  });
};

export default consumerService;
