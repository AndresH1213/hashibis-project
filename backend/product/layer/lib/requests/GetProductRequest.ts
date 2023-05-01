import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGwRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';

export class GetProductRequest extends ApiGwRequest {
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

export class GetAllProductsRequest extends ApiGwRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);
  }
}
