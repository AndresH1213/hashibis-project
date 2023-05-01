import {
  LambdaClient as Lambda,
  InvokeCommand,
  InvokeCommandInput,
} from '@aws-sdk/client-lambda';

export default class LambdaClient {
  async invoke(params: InvokeCommandInput) {
    const client = new Lambda({ region: process.env.REGION });
    const command = new InvokeCommand(params);
    return await client.send(command);
  }
}
