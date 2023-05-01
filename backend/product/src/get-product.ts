import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import errors from '/opt/nodejs/exceptions/errors.json';
import { GetProductRequest } from '../layer/lib/requests/GetProductRequest';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';
import Product from '../layer/models/Product';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new GetProductRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }

  const productId = request.getPathParam('id');
  const product = new Product({ id: productId });

  try {
    const { Item } = await product.getById();

    if (!Item) {
      throw new ValidationException(errors.product.PRODUCT_NOT_FOUND);
    }

    return ApiGwResponse.format(200, {
      message: 'Product retrieved successfully',
      item: unmarshall(Item),
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
