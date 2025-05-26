import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface RequestWithSessionToken extends Request {
  userSessionToken?: string;
}

@Injectable()
export class UserSessionTokenMiddleware implements NestMiddleware {
  use(req: RequestWithSessionToken, res: Response, next: NextFunction): void {
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];
    if (
      authHeader &&
      typeof authHeader === 'string' &&
      authHeader.startsWith('Bearer ')
    ) {
      const token = authHeader.replace('Bearer ', '').trim();
      req.userSessionToken = token;
      next();
    } else {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header (Bearer token required)',
      );
    }
  }
}
