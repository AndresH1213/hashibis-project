import { IError } from '../interfaces';

export default class ApiGwResponse {
  static format(statusCode: number, body: any, headers: any = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '',
      'Access-Control-Allow-Methods': 'POST, PUT, GET, PATCH',
      'Access-Control-Allow-Origin': '*',
    };

    headers = { ...defaultHeaders, ...headers };

    return {
      statusCode,
      body: JSON.stringify(body),
      headers,
    };
  }

  static handleException(e: IError) {
    let httpStatusCode = 500;
    let code = 'HS500';
    let message = 'oops!, something went wrong';
    const validCodes = [400, 403, 404, 503];

    if (validCodes.includes(e.httpStatus)) {
      httpStatusCode = e.httpStatus;
      code = e.code;
      message = e.message;
    } else {
      console.log({ error: e });
    }

    return ApiGwResponse.format(httpStatusCode, {
      errors: [{ code, message }],
    });
  }
}
