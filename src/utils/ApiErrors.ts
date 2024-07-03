class APIErrors extends Error {
  statusCode: number;
  status: string;
  operational: boolean;
  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.operational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = APIErrors;
