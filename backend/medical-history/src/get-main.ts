import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { GetMedicalHistoryRequest } from '@/layer/lib/requests/GetMedicalHistoryRequest';
import errors from '/opt/nodejs/exceptions/errors.json';
import ValidationException from '/opt/nodejs/exceptions/ValidationException';

import ApiGwResponse from '/opt/nodejs/libs/ApiGwResponse';
import MedicalHistory from '../layer/models/MedicalHistory';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const handler: APIGatewayProxyHandler = async (
  event
): Promise<APIGatewayProxyResult> => {
  const request = new GetMedicalHistoryRequest(event);
  const requestValidated = request.validate();
  if (!requestValidated.valid) {
    return ApiGwResponse.format(400, {
      errors: requestValidated.errors,
    });
  }
  const user = request.getUser();
  const medicalHistory = new MedicalHistory({ userId: user.id });

  try {
    const { Item } = await medicalHistory.getByUser();

    if (!Item) {
      throw new ValidationException(
        errors.medicalHistory.USER_DO_NOT_HAVE_MEDICAL_HISTORY
      );
    }

    return ApiGwResponse.format(200, {
      message: 'Medical History retrieved successfully',
      item: unmarshall(Item),
    });
  } catch (e) {
    console.log({ error: e });
    return ApiGwResponse.handleException(e);
  }
};

export { handler };
