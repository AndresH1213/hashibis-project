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

    this.validationRules = {
      queryParams: {
        type: 'object',
        properties: {
          limit: {
            type: 'string',
            pattern: '^(\\d)$',
            maxLength: 3,
            description: 'Limit of Items to be retrieved',
          },
          // Format => {"id":{"S":"01H8DPTT9WSK7265C93ZY928C9"}}
          lastEvaluatedKey: {
            type: 'string',
            minLength: 41,
            maxLength: 41,
            description: 'Last key evaluated in the scan, used for pagination',
          },
        },
      },
    };
  }
}
