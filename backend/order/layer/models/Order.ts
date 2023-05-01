import dynamoClient from '/opt/nodejs/services/DynamoClient';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { generateId } from '/opt/nodejs/libs/Id';

export default class Order {
  private tableName: string = process.env.ORDER_TABLE_NAME;

  public userId: string;
  public id: string;
  public body: any;

  constructor(props: any) {
    const { userId, id, ...body } = props;
    this.userId = userId;
    this.id = id;
    this.body = body;
  }

  toPublicJson() {
    return {
      userId: this.userId,
      id: this.id,
      ...this.body,
    };
  }

  async getById(): Promise<any> {
    const item = await dynamoClient.getByKey({
      TableName: this.tableName,
      Key: marshall({
        userId: this.userId,
        id: this.id,
      }),
    });
    return item;
  }

  private static getTableName() {
    return process.env.ORDER_TABLE_NAME;
  }

  static async getAll(): Promise<any> {
    const params = {
      TableName: this.getTableName(),
      Limit: 10,
    };
    const items = await dynamoClient.scan(params);
    return items;
  }

  async save() {
    const item = {
      userId: this.userId,
      id: generateId(),
      ...this.body,
    };
    await dynamoClient.save({
      TableName: this.tableName,
      Item: marshall(item || {}),
    });
  }
}
