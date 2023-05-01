import JsonValidator from './JsonValidator';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { IValidationRules, IValidatorResponse } from '../interfaces';

export default abstract class ApiGwRequest {
  abstract validationRules: IValidationRules;

  constructor(private event: APIGatewayProxyEvent) {
    console.log('Request created with event: ', event);
  }

  validate() {
    let result: IValidatorResponse = { valid: true, errors: [] };
    if (!this.validationRules) return result;

    if (this.validationRules.pathParams) {
      const pathParamsValidator = JsonValidator.validate(
        this.getPathParams(),
        this.validationRules.pathParams
      );

      result.valid = result.valid && pathParamsValidator.valid;
      result.errors = result.errors.concat(pathParamsValidator.errors);
    }

    if (this.validationRules.queryParams) {
      const queryParamsValidator = JsonValidator.validate(
        this.getQueryParams(),
        this.validationRules.queryParams
      );

      result.valid = result.valid && queryParamsValidator.valid;
      result.errors = result.errors.concat(queryParamsValidator.errors);
    }

    if (this.validationRules.bodyParams) {
      try {
        let body = this.getBody();

        if (!body) {
          throw new Error(
            'Invalid request body, please verify the structure of your request'
          );
        }

        const bodyParamsValidator = JsonValidator.validate(
          body,
          this.validationRules.bodyParams
        );

        result.valid = result.valid && bodyParamsValidator.valid;
        result.errors = result.errors.concat(bodyParamsValidator.errors);
      } catch (error) {
        console.log(`Error on validate body: ${error}`);
        result.valid = false;
        result.errors.push({
          message:
            'Invalid request body, please verify the structure of your request',
        });
      }
    }

    return result;
  }

  getQueryParams() {
    return this.event.queryStringParameters || {};
  }

  getPathParams() {
    return this.event.pathParameters || {};
  }

  getBody() {
    return JSON.parse(this.event.body || '{}');
  }

  getPathParam(keyParam: string, defaultValue?: string) {
    let param = defaultValue;
    const pathParams = this.getPathParams();

    if (pathParams[keyParam]) {
      param = pathParams[keyParam];
    }

    return param;
  }

  getQueryParam(keyParam: string, defaultValue?: string) {
    let param = defaultValue;
    const queryParams = this.getQueryParams();

    if (queryParams[keyParam]) {
      param = queryParams[keyParam];
    }

    return param;
  }

  getUser() {
    return {
      id: '123456789',
    };
  }

  isPrivateRequest() {
    return (
      this.event.headers?.['x-private-token'] === process.env.PRIVATE_TOKEN
    );
  }
}
