import { Request, Response, NextFunction } from 'express';

const UNKNOWN_ERROR_MESSAGE = 'An unknown error occurred';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncErrorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      const errorMessage = error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE;
      res.status(500).json({ message: errorMessage });
    });
  };
};
