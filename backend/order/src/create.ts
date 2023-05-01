import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import CreateOrderRequest from '../layer/lib/requests/CreateOrderRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import Order from '../layer/models/Order';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new CreateOrderRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const body = request.getBody();
  const user = request.getUser();
  const props = {
    ...body,
    userId: user.id,
  };
  const order = new Order(props);

  try {
    const newItem = await order.save();
    return ApiGwResponse.format(201, {
      message: 'Order created successfully',
      item: order.toPublicJson(),
    });
  } catch (e) {
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
