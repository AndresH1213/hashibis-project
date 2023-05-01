import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import { DeleteProductRequest } from '../layer/lib/requests/DeleteProductRequest';
import Product from '../layer/models/Product';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new DeleteProductRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }

  const productId = request.getPathParam('id');
  const user = request.getUser(); // check is admin

  const product = new Product({ id: productId });

  try {
    await product.delete();

    return ApiGwResponse.format(204, {});
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
