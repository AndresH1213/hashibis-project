import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';
import Order from '../schemas/Order';

export default class CreateOrderRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {
      bodyParams: Order.getSchema(),
    };
  }
}
