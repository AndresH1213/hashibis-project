import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class UploadImageProfileRequest extends ApiGatewayRequest {
  readonly validationRules: {
    queryParams: { type: 'object'; properties?: any; required: string[] };
  };
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {
      queryParams: {
        type: 'object',
        properties: {
          contentType: {
            type: 'string',
            pattern: '^image/.*',
          },
          ext: {
            type: 'string',
            minLength: 3,
            maxLength: 6,
          },
        },
        required: ['contentType', 'ext'],
      },
    };
  }
}
