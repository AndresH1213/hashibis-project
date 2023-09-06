import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { UpdateMedicalHistoryRequest } from '../layer/lib/requests/PutMedicalHistoryRequest';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import MedicalHistory from '../layer/models/MedicalHistory';
import errors from '/opt/nodejs/exceptions/errors.json';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new UpdateMedicalHistoryRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const body = request.getBody();
  const user = request.getUser();

  if (Object.keys(body).length === 0) {
    throw new ValidationException(
      errors.medicalHistory.MEDICAL_HISTORY_NO_DATA_TO_UPDATED
    );
  }

  const medicalHistory = new MedicalHistory({ userId: user.id, ...body });

  try {
    const newItem = await medicalHistory.update();
    return ApiGwResponse.format(200, {
      message: 'Medical History updated successfully',
      item: newItem,
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
