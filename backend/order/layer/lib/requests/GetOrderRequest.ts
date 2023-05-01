import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGwRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';

export class GetOrderRequest extends ApiGwRequest {
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
            description: 'Id of the order',
          },
        },
        required: ['id'],
      },
    };
  }
}

export class GetAllOrdersRequest extends ApiGwRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);
  }
}
