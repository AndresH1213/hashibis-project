import JsonValidator from './JsonValidator';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { IValidationRules, IValidatorResponse } from '../interfaces';
import SecretManagerClient from '../services/SecretManagerClient';

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
    const bodyParamsSended = JSON.parse(this.event.body || '{}');
    const allowedParams = this.validationRules.bodyParams;
    const body = JsonValidator.validateBodyParams(
      bodyParamsSended,
      allowedParams
    );
    return body;
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
    const isTest = process.env.TS_JEST;
    const isOffline = process.env.IS_OFFLINE;
    if (isOffline || isTest) return { id: '123456789' };
    if (!this.event.requestContext.authorizer?.jwt) {
      throw new Error('No authorizer route');
    }
    const id = this.event.requestContext.authorizer.jwt.claims.sub;
    return { id };
  }

  async isAdminUser() {
    const isTest = process.env.TS_JEST;
    const isOffline = process.env.IS_OFFLINE;
    if (isOffline || isTest) return true;
    const secretClient = new SecretManagerClient();
    const adminId = await secretClient.getSecretValue('ADMIN_USER_ID');
    return this.getUser().id === adminId;
  }

  isPrivateRequest() {
    return (
      this.event.headers?.['x-private-token'] === process.env.PRIVATE_TOKEN
    );
  }
}
