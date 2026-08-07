import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      // Invalid token
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};

export default {
  verifyToken
};
