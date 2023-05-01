import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { IProduct, ProductProps } from '../interfaces';
import { generateId } from '/opt/nodejs/libs/Id';
import dynamoClient from '/opt/nodejs/services/DynamoClient';

export default class Product {
  private tableName: string = process.env.PRODUCT_TABLE_NAME;

  public id: string;
  public body: Partial<IProduct>;
  constructor(public props: ProductProps) {
    const { id, ...body } = props;
    this.id = id;
    this.body = body;
  }

  toPublicJson() {
    return {
      id: this.id,
      ...this.body,
    };
  }

  async getById(): Promise<any> {
    const item = await dynamoClient.getByKey({
      TableName: this.tableName,
      Key: marshall({
        id: this.id,
      }),
    });
    return item;
  }

  async update(): Promise<any> {
    const item = {
      key: { id: { S: this.id } },
      ...this.body,
    };
    const { Attributes } = await dynamoClient.patch(item, this.tableName);
    return unmarshall(Attributes);
  }

  private static getTableName() {
    return process.env.PRODUCT_TABLE_NAME;
  }

  static async getAll(): Promise<any> {
    const params = {
      TableName: this.getTableName(),
      Limit: 10,
    };
    const items = await dynamoClient.scan(params);

    return items;
  }

  async delete(): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: marshall({
        id: this.id,
      }),
    };
    await dynamoClient.delete(params);
  }

  async save() {
    this.id = generateId();
    const item = {
      id: this.id,
      ...this.body,
    };
    await dynamoClient.save({
      TableName: this.tableName,
      Item: marshall(item || {}),
    });
  }
}
