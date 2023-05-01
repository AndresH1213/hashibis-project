import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';
import MedicalHistory from '../schemas/MedicalHistory';

export class CreateMedicalHistoryRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {
      bodyParams: MedicalHistory.getSchema(),
    };
  }
}

export class UpdateMedicalHistoryRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    const medicalHistorySchema = MedicalHistory.getSchema();

    this.validationRules = {
      bodyParams: { ...medicalHistorySchema, required: [] },
    };
  }
}
