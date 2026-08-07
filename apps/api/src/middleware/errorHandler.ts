import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log this for debug purposes
  console.error(err.stack);
  // Return custom error to user
  res.status(500).json({ error: 'Internal Server Error' });
};

export default { errorHandler };
