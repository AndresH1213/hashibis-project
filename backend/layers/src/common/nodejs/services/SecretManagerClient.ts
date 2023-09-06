import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export default class SecretManagerClient {
  private client: SecretsManagerClient;
  private secretName: string = 'dev/hashibis';
  constructor() {
    this.client = new SecretsManagerClient({ region: process.env.REGION });
  }

  async getSecretValue(key: string, versionId?: string) {
    const input = {
      SecretId: this.secretName,
      VersionId: versionId,
    };
    const command = new GetSecretValueCommand(input);
    const response = await this.client.send(command);
    if (response.$metadata.httpStatusCode !== 200) return;
    const secretJson = JSON.parse(response.SecretString || '{}');
    return secretJson[key];
  }
}
