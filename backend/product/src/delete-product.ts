import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import { DeleteProductRequest } from '../layer/lib/requests/DeleteProductRequest';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';
import errors from '/opt/nodejs/exceptions/errors.json';
import Product from '../layer/models/Product';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new DeleteProductRequest(event);
  const isAdmin = await request.isAdminUser();

  if (!isAdmin) {
    throw new ValidationException(errors.users.USER_IS_NOT_ADMIN);
  }

  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }

  const productId = request.getPathParam('id');
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
