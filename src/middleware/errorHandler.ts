import { NextFunction, Request, Response } from "express";

export interface ResponseError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: error.message,
  });
};
