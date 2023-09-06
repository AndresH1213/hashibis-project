import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class GetByIdMedicalHistoryRequest extends ApiGatewayRequest {
  readonly validationRules: { pathParams: any };
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {
      pathParams: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
        required: ['id'],
      },
    };
  }
}
