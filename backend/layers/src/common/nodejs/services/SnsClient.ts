import {
  SNSClient,
  PublishCommand,
  PublishCommandInput,
} from '@aws-sdk/client-sns';

export default class SnsClient {
  async publish(params: PublishCommandInput) {
    const client = new SNSClient({ region: process.env.REGION });
    const command = new PublishCommand(params);
    return await client.send(command);
  }
}
