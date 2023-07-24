class AppErrors extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "failed";
  }
}

export default AppErrors;
