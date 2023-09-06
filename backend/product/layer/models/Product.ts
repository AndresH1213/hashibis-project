import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { IProduct, ProductProps, getAllProps } from '../interfaces';
import { generateId } from '/opt/nodejs/libs/Id';
import dynamoClient from '/opt/nodejs/services/DynamoClient';

export default class Product {
  public id: string;
  public body: Partial<IProduct>;
  constructor(public props: ProductProps) {
    const { id, ...body } = props;
    this.id = id;
    this.body = body;
  }

  private static getTableName() {
    return process.env.IS_OFFLINE
      ? 'api-hashibis-product-table-dev'
      : process.env.PRODUCT_TABLE_NAME;
  }

  toPublicJson() {
    return {
      id: this.id,
      ...this.body,
    };
  }

  async getById(): Promise<any> {
    const item = await dynamoClient.getByKey({
      TableName: Product.getTableName(),
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
    const { Attributes } = await dynamoClient.patch(
      item,
      Product.getTableName()
    );
    return unmarshall(Attributes);
  }

  static async queryByIndex({ category }: { category: string }): Promise<any> {
    const params = {
      tableName: this.getTableName(),
      index: { name: 'categoryGSI', attribute: 'category', value: category },
    };
    const result = await dynamoClient.queryByIndex(params);
    return result;
  }

  static async getAll({ limit, lastEvaluatedKey }: getAllProps): Promise<any> {
    const params = {
      TableName: this.getTableName(),
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey,
    };
    const result = await dynamoClient.scan(params);

    return result;
  }

  static async handleQuery({ limit, lastEvaluatedKey, category }) {
    if (category) {
      return await this.queryByIndex({ category });
    }
    const LEKObj = lastEvaluatedKey && JSON.parse(lastEvaluatedKey);
    return await this.getAll({
      limit,
      lastEvaluatedKey: LEKObj,
    });
  }

  async delete(): Promise<any> {
    const params = {
      TableName: Product.getTableName(),
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
      TableName: Product.getTableName(),
      Item: marshall(item || {}),
    });
  }
}
