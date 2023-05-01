import { IPersonalInformation, PersonalInformationProps } from '../interfaces';
import dynamoClient from '/opt/nodejs/services/DynamoClient';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export default class PersonalInformation {
  private tableName: string = process.env.PERSONAL_INFORMATION_TABLE_NAME;

  public userId: string;
  public body: Partial<IPersonalInformation>;

  constructor(props: PersonalInformationProps) {
    const { userId, ...body } = props;
    this.userId = userId;
    this.body = body;
  }

  toPublicJson() {
    return {
      userId: this.userId,
      ...this.body,
    };
  }

  async getByUser(): Promise<any> {
    const item = await dynamoClient.getByKey({
      TableName: this.tableName,
      Key: marshall({
        userId: this.userId,
      }),
    });
    return item;
  }

  async update(): Promise<any> {
    const item = {
      key: { userId: { S: this.userId } },
      ...this.body,
    };
    const { Attributes } = await dynamoClient.patch(item, this.tableName);
    return unmarshall(Attributes);
  }

  async save() {
    const item = {
      userId: this.userId,
      ...this.body,
    };
    await dynamoClient.save({
      TableName: this.tableName,
      Item: marshall(item || {}),
    });
  }
}
