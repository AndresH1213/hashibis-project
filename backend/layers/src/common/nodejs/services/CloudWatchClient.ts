import {
  CloudWatchClient as CWClient,
  PutMetricDataCommand,
  PutMetricDataCommandInput,
} from '@aws-sdk/client-cloudwatch';

export default class CloudWatchClient {
  async putMetricData(params: PutMetricDataCommandInput) {
    const client = new CWClient({ region: process.env.REGION });
    const command = new PutMetricDataCommand(params);
    return await client.send(command);
  }
}
