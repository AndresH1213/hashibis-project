import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';

export class DeleteProductRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {
      pathParams: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            minLength: 5,
            description: 'Id of the product',
          },
        },
        required: ['id'],
      },
    };
  }
}
