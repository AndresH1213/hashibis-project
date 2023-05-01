import Exception from './Exception';
import { IError } from '../interfaces';

export default class ValidationException extends Exception {
  constructor(error: IError) {
    super(error.code, error.message, error.httpStatus);
  }
}
