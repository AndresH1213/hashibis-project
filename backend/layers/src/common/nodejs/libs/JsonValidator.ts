import { Validator, ValidationError, Schema } from 'jsonschema';
import { IValidatorResponse } from '../interfaces';

export default class JsonValidator {
  private static formatErrors(errors: ValidationError[]) {
    return errors.map((error: ValidationError) => {
      return { message: error.stack };
    });
  }

  static validate(data: any, schema: Schema): IValidatorResponse {
    const validator = new Validator();
    const validationResult = validator.validate(data, schema);

    return {
      valid: validationResult.valid,
      errors: JsonValidator.formatErrors(validationResult.errors),
    };
  }

  static validateBodyParams(
    params: Record<string, any>,
    allowedParams: Record<string, any>
  ) {
    if (allowedParams?.type !== 'object') {
      return {};
    }
    const result: Record<string, any> = {};
    Object.keys(params).forEach((key) => {
      if (allowedParams.properties.hasOwnProperty(key)) {
        result[key] = params[key];
      }
    });
    return result;
  }
}
