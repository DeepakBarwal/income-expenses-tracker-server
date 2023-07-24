const globalErrorHandler = (error, req, res, next) => {
  const statusCode = (error.statusCode = error.statusCode || 500);
  const status = (error.status = error.status || "error");
  const message = error.message;
  const stack = error.stack;

  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

export default globalErrorHandler;
