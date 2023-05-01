export default class Exception extends Error {
  constructor(public code: string, public message: string, public httpStatus: number) {
    super(message);
  }
}
