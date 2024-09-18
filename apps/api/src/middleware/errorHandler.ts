// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  // Log this for debug purposes
  console.error(err.stack);
  // Return custom error to user
  res.status(500).json({ error: 'Internal Server Error' });
};

export default { errorHandler };
