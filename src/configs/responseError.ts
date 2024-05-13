export default class ResponseError extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
