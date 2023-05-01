import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import errors from '/opt/nodejs/exceptions/errors.json';
import { GetOrderRequest } from '../layer/lib/requests/GetOrderRequest';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';
import Order from '../layer/models/Order';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new GetOrderRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }

  const orderId = request.getPathParam('id');
  const user = request.getUser();
  const order = new Order({ userId: user.id, id: orderId });

  try {
    const { Item } = await order.getById();

    if (!Item) {
      throw new ValidationException(errors.order.ORDER_NOT_FOUND);
    }

    return ApiGwResponse.format(200, {
      message: 'Order retrieved successfully',
      item: unmarshall(Item),
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
