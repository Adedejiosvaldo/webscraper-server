export class AppError extends Error {
  statusCode;
  isOperational;
  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
