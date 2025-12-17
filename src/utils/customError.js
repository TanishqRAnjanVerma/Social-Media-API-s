export default class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Ensures the correct prototype chain
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
