import {
  DynamoDBClient,
  QueryCommand,
  UpdateItemCommand,
  PutItemCommand,
  ScanCommand,
  GetItemCommand,
  DeleteItemCommand,
  QueryCommandInput,
  UpdateItemCommandInput,
  PutItemCommandInput,
  ScanCommandInput,
  GetItemCommandInput,
  DeleteItemCommandInput,
} from '@aws-sdk/client-dynamodb';

import { marshall } from '@aws-sdk/util-dynamodb';

import {
  DynamoClientParams,
  IQueryByIndexComposeInput,
  IQueryByIndexInput,
} from '../interfaces';

class SingletonDynamoClient {
  private static instance: SingletonDynamoClient;
  private client: DynamoDBClient;

  private constructor() {
    this.client = new DynamoDBClient(this.getDynamoParams());
  }

  public static getInstance(): SingletonDynamoClient {
    if (!SingletonDynamoClient.instance) {
      SingletonDynamoClient.instance = new SingletonDynamoClient();
    }
    return SingletonDynamoClient.instance;
  }

  private getDynamoParams() {
    const params: DynamoClientParams = { region: process.env.REGION || '' };
    if (process.env.IS_OFFLINE) {
      params['region'] = 'localhost';
      params['endpoint'] = 'http://localhost:8000';
      params['accessKeyId'] = 'DEFAULT_ACCESS_KEY';
      params['secretAccessKey'] = 'DEFAULT_SECRET';
    }
    return params;
  }

  async save(params: PutItemCommandInput) {
    const command = new PutItemCommand(params);
    return await this.client.send(command);
  }
  async query(params: QueryCommandInput) {
    const command = new QueryCommand(params);
    return await this.client.send(command);
  }
  async getByKey(params: GetItemCommandInput) {
    const command = new GetItemCommand(params);
    return await this.client.send(command);
  }
  async queryByIndex({ tableName, index }: IQueryByIndexInput) {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: index.name,
      KeyConditionExpression: `#${index.attribute} = :${index.attribute}`,
      ExpressionAttributeNames: {
        [`#${index.attribute}`]: index.attribute,
      },
      ExpressionAttributeValues: {
        [`:${index.attribute}`]: { S: index.value },
      },
    });
    return await this.client.send(command);
  }

  async queryByComposeIndex({ tableName, index }: IQueryByIndexComposeInput) {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: index.name,
      KeyConditionExpression: `#${index.pk.attribute} = :${index.pk.attribute} AND #${index.sk.attribute} = :${index.sk.attribute}`,
      ExpressionAttributeNames: {
        [`#${index.pk.attribute}`]: index.pk.attribute,
        [`#${index.sk.attribute}`]: index.sk.attribute,
      },
      ExpressionAttributeValues: {
        [`:${index.pk.attribute}`]: { S: index.pk.value },
        [`:${index.sk.attribute}`]: { S: index.sk.value },
      },
    });
    return await this.client.send(command);
  }

  async update(params: UpdateItemCommandInput) {
    const command = new UpdateItemCommand(params);
    return await this.client.send(command);
  }

  async patch(item: Record<string, any>, tableName: string) {
    const { key, ...updatedProperties } = item;

    const params: UpdateItemCommandInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: 'SET',
      ExpressionAttributeValues: {},
      ReturnValues: 'ALL_NEW',
    };

    let updateExpression = '';

    // Add each property to the update expression and attribute values
    Object.entries(updatedProperties).forEach(([key, value]) => {
      const attributeValueKey = `:x${key}`;
      const updateString = ` ${key} = ${attributeValueKey},`;
      updateExpression += updateString;
      const valueObj = marshall({ [attributeValueKey]: value });
      params.ExpressionAttributeValues = valueObj;
    });

    // Remove trailing comma from update expression
    params.UpdateExpression += updateExpression.slice(0, -1);

    const command = new UpdateItemCommand(params);
    return await this.client.send(command);
  }

  async delete(params: DeleteItemCommandInput) {
    const command = new DeleteItemCommand(params);
    return await this.client.send(command);
  }
  async scan(params: ScanCommandInput) {
    const command = new ScanCommand(params);
    return await this.client.send(command);
  }
}

export default SingletonDynamoClient.getInstance();
