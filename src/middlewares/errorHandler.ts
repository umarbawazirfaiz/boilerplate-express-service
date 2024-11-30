import { NextFunction, Request, Response } from "express";
import { getConfig } from "../config";
import httpStatus from "http-status";
import { loggerHttp } from "../utils/logger";
import ApiError from "../utils/apiError";

const config = getConfig();

export const errorConverter = (
  err: TypeError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }

  next(error);
};

export const errorHandler = (
  err: TypeError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err as ApiError;

  if (config.NODE_ENV === "production") {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  loggerHttp.logger.error(err, err.message);

  const response = {
    code: statusCode,
    message,
    ...(config.NODE_ENV === "development" && { error: err.stack }),
  };

  res.status(statusCode).json(response);
};
