import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { CreateProductRequest } from '../layer/lib/requests/CreateProductRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import Product from '../layer/models/Product';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new CreateProductRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const body = request.getBody();
  const product = new Product(body);

  try {
    const newItem = await product.save();
    return ApiGwResponse.format(201, {
      message: 'Product created successfully',
      item: product.toPublicJson(),
    });
  } catch (e) {
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
