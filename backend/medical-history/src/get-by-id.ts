import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import MedicalHistory from '@/layer/models/MedicalHistory';
import errors from '/opt/nodejs/exceptions/errors.json';
import { GetByIdMedicalHistoryRequest } from '@/layer/lib/requests/GetMedicalHistoryRequest';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new GetByIdMedicalHistoryRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const user = request.getUser(); // Check user is admin
  const userId = request.getPathParam('id');
  const medicalHistory = new MedicalHistory({ userId });

  try {
    const { Item } = await medicalHistory.getByUser();

    if (!Item) {
      throw new ValidationException(
        errors.medicalHistory.MEDICAL_HISTORY_NOT_FOUND
      );
    }

    return ApiGwResponse.format(200, {
      message: 'Medical History retrieved successfully',
      medicalHistory: unmarshall(Item),
    });
  } catch (e) {
    console.log(e);
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
