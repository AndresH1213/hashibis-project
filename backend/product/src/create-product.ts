import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { CreateProductRequest } from '../layer/lib/requests/PutProductRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import Product from '../layer/models/Product';
import { ProductProps } from '@/layer/interfaces';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';
import errors from '/opt/nodejs/exceptions/errors.json';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new CreateProductRequest(event);
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

  const body = request.getBody() as ProductProps;
  const product = new Product(body);

  try {
    await product.save();
    return ApiGwResponse.format(201, {
      message: 'Product created successfully',
      item: product.toPublicJson(),
    });
  } catch (e) {
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
