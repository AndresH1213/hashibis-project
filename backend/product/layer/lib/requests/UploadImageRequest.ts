import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';

export class UploadImageRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {};
  }
}
