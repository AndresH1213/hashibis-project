import { APIGatewayProxyEvent } from 'aws-lambda';
import ApiGatewayRequest from '/opt/nodejs/libs/ApiGwRequest';
import { IValidationRules } from '/opt/nodejs/interfaces';
import Product from '../schemas/ProductSchema';

export class CreateProductRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    this.validationRules = {
      bodyParams: Product.getSchema(),
    };
  }
}

export class UpdateProductRequest extends ApiGatewayRequest {
  readonly validationRules: IValidationRules;
  constructor(event: APIGatewayProxyEvent) {
    super(event);

    const productSchema = Product.getSchema();
    this.validationRules = {
      bodyParams: { ...productSchema, required: [] },
    };
  }
}
