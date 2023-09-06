import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { GetAllProductsRequest } from '../layer/lib/requests/GetProductRequest';
import errors from '/opt/nodejs/exceptions/errors.json';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';

import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import Product from '../layer/models/Product';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new GetAllProductsRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }

  const limit = Number(request.getQueryParam('limit', '12'));
  const { lastEvaluatedKey, category } = request.getQueryParams();

  try {
    const { Items, LastEvaluatedKey } = await Product.handleQuery({
      limit,
      lastEvaluatedKey,
      category,
    });

    if (!Items) {
      throw new ValidationException(errors.product.NO_PRODUCTS_IN_DB);
    }

    return ApiGwResponse.format(200, {
      message: 'Products retrieved successfully',
      items: Items.map((it: Record<string, any>) => unmarshall(it)),
      lastEvaluatedKey: LastEvaluatedKey,
    });
  } catch (e) {
    console.log({ error: e });
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
