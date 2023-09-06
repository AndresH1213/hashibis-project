import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';
import PersonalInformation from '../schemas/PersonalInformation';

export class CreatePersonalInformationRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {
      bodyParams: PersonalInformation.getSchema(),
    };
  }
}

export class UpdatePersonalInformationRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    const personalInfoSchema = PersonalInformation.getSchema();

    this.validationRules = {
      bodyParams: { ...personalInfoSchema, required: [] },
    };
  }
}
