import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import { UploadImageProfileRequest } from '@/layer/lib/requests/UploadImageProfileRequest';
import Image from '@/layer/models/Image';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new UploadImageProfileRequest(event);
  const requestValidated = request.validate();

  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, { errors: requestValidated.errors });
  }

  const user = request.getUser();

  const { contentType, ext } = event.queryStringParameters;

  const image = new Image(user.id, contentType, ext);

  try {
    const url = await image.getPresignedUrl();
    return ApiGwResponse.format(200, {
      url,
    });
  } catch (e) {
    console.log({ error: e });
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
