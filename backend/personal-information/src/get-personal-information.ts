import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import PersonalInformation from '@/layer/models/PersonalInformation';
import errors from '/opt/nodejs/exceptions/errors.json';
import { GetPersonalInformationRequest } from '@/layer/lib/requests/GetPersonalInformationRequest';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new GetPersonalInformationRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const user = request.getUser(); // Check user is admin
  const userId = request.getPathParam('id');
  const personalInfo = new PersonalInformation({ userId });

  try {
    const { Item } = await personalInfo.getByUser();

    if (!Item) {
      throw new ValidationException(
        errors.personalInformation.PERSONAL_INFORMATION_NOT_FOUND
      );
    }

    return ApiGwResponse.format(200, {
      message: 'Personal Information retrieved successfully',
      item: unmarshall(Item),
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
