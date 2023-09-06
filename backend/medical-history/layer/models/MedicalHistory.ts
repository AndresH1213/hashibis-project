import { IMedicalHistory, MedicalHistoryProps } from '../interfaces';
import dynamoClient from '/opt/nodejs/services/DynamoClient';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export default class MedicalHistory {
  public userId: string;
  public body: Partial<IMedicalHistory>;
  constructor(props: MedicalHistoryProps) {
    const { userId, ...body } = props;
    this.userId = userId;
    this.body = body;
  }

  private static getTableName() {
    return process.env.IS_OFFLINE
      ? 'api-hashibis-medical-history-table-dev'
      : process.env.MEDICAL_HISTORY_TABLE_NAME;
  }

  toPublicJson() {
    return {
      userId: this.userId,
      ...this.body,
    };
  }

  async getByUser(): Promise<any> {
    const item = await dynamoClient.getByKey({
      TableName: MedicalHistory.getTableName(),
      Key: marshall({
        userId: this.userId,
      }),
    });
    return item;
  }

  async update(): Promise<any> {
    const item = {
      key: marshall({ userId: this.userId }),
      ...this.body,
    };
    const { Attributes } = await dynamoClient.patch(
      item,
      MedicalHistory.getTableName()
    );
    return unmarshall(Attributes);
  }

  async save() {
    const item = {
      userId: this.userId,
      ...this.body,
    };
    await dynamoClient.save({
      TableName: MedicalHistory.getTableName(),
      Item: marshall(item),
    });
  }
}
