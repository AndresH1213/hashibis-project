import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { UpdatePersonalInformationRequest } from '../layer/lib/requests/PutPersonalInformationRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import PersonalInformation from '../layer/models/PersonalInformation';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new UpdatePersonalInformationRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const body = request.getBody();
  const user = request.getUser();
  const personalInformation = new PersonalInformation({
    userId: user.id,
    ...body,
  });

  try {
    const newItem = await personalInformation.update();
    return ApiGwResponse.format(200, {
      message: 'Personal Information updated successfully',
      item: newItem,
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
