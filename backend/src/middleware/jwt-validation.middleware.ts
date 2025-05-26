import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  exp?: number;
  iss?: string;
  user_id?: string;
  sub?: string;
  [key: string]: unknown;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const payload = Buffer.from(base64, 'base64').toString('utf-8');
    return JSON.parse(payload) as JwtPayload;
  } catch {
    return null;
  }
}

@Injectable()
export class JwtValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const token = (req as { userSessionToken?: string }).userSessionToken;
    if (!token) {
      throw new UnauthorizedException('Missing Bearer token');
    }

    const payload = decodeJwtPayload(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid JWT format');
    }

    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== 'number' || payload.exp < now) {
      throw new UnauthorizedException('JWT expired');
    }

    if (
      payload.iss !== 'https://securetoken.google.com/bento-ky' &&
      payload.iss !== 'https://securetoken.google.com/bento-ky/'
    ) {
      throw new UnauthorizedException('Invalid JWT issuer');
    }
    next();
  }
}
