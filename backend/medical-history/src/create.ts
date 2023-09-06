import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { CreateMedicalHistoryRequest } from '../layer/lib/requests/PutMedicalHistoryRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import MedicalHistory from '../layer/models/MedicalHistory';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new CreateMedicalHistoryRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const body = request.getBody();
  const user = request.getUser();
  const medicalHistory = new MedicalHistory({ userId: user.id, ...body });

  try {
    await medicalHistory.save();
    return ApiGwResponse.format(201, {
      message: 'Medical History created successfully',
      item: medicalHistory.toPublicJson(),
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
