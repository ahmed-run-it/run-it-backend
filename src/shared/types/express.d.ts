import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Remplace `any` par le type approprié pour `user`
    }
  }
}
