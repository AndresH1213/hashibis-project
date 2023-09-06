import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import errors from '/opt/nodejs/exceptions/errors.json';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';

import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import Image from '@/layer/models/Image';
import { UploadImageRequest } from '@/layer/lib/requests/UploadImageRequest';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new UploadImageRequest(event);
  const isAdmin = await request.isAdminUser();
  if (!isAdmin) {
    throw new ValidationException(errors.users.USER_IS_NOT_ADMIN);
  }

  const { code, name, contentType } = event.queryStringParameters;
  const image = new Image(code, name, contentType);

  if (!image.validate()) {
    return ApiGwResponse.format(400, { errors: errors.product.NO_IMAGE_DATA });
  }

  try {
    const url = await image.buildUrl();
    return ApiGwResponse.format(200, {
      url,
    });
  } catch (e) {
    console.log({ error: e });
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
