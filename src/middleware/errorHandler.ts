import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errMessage = "An unkown error occurred.";
  if (isHttpError(error)) {
    (statusCode = error.status), (errMessage = error.message);
  }

  res.status(statusCode).json({
    error: {
      message: errMessage,
    },
  });
};
