import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { GetAllOrdersRequest } from '../layer/lib/requests/GetOrderRequest';
import errors from '/opt/nodejs/exceptions/errors.json';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';

import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import Order from '../layer/models/Order';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new GetAllOrdersRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }

  try {
    const { Items } = await Order.getAll();

    if (!Items) {
      throw new ValidationException(errors.order.NO_ORDERS_IN_DB);
    }

    return ApiGwResponse.format(200, {
      message: 'Orders retrieved successfully',
      items: Items.map((it) => unmarshall(it)),
    });
  } catch (e) {
    console.log({ error: e });
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
