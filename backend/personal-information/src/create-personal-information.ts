import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { CreatePersonalInformationRequest } from '@/layer/lib/requests/PutPersonalInformationRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import PersonalInformation from '@/layer/models/PersonalInformation';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new CreatePersonalInformationRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const body = request.getBody();
  const user = request.getUser();
  const personalInfo = new PersonalInformation({ userId: user.id, ...body });

  try {
    const newItem = await personalInfo.save();
    return ApiGwResponse.format(201, {
      message: 'Personal Information created successfully',
      item: personalInfo.toPublicJson(),
    });
  } catch (e) {
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
