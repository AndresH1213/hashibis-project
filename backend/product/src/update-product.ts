import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { UpdateProductRequest } from '../layer/lib/requests/CreateProductRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import Product from '../layer/models/Product';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';
import errors from '/opt/nodejs/exceptions/errors.json';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new UpdateProductRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const body = request.getBody();
  const productId = request.getPathParam('id');
  const user = request.getUser(); // check is admin

  if (Object.keys(body).length === 0) {
    throw new ValidationException(errors.product.PRODUCT_NO_DATA_TO_UPDATED);
  }
  const product = new Product({ id: productId, ...body });

  try {
    const newItem = await product.update();
    return ApiGwResponse.format(200, {
      message: 'Product updated successfully',
      item: newItem,
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
