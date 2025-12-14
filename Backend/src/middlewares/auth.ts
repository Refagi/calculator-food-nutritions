import passport from 'passport';
import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiErrors.js';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../models/index.js';
import { Prisma } from '../generated/prisma/client';

type User = Prisma.UserGetPayload<{}>;
type Token = Prisma.TokenGetPayload<{}>;

export const attachTokenFromCookiesOrHeader = (req: Request) => {
  const cookieToken = req.cookies?.accessToken;
  const headerAuth = req.headers.authorization;

  if (headerAuth && headerAuth.startsWith("Bearer ")) {
    req.headers.authorization = headerAuth;
  } else if (cookieToken) {
    req.headers.authorization = `Bearer ${cookieToken}`;
  }
};

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    attachTokenFromCookiesOrHeader(req);

    passport.authenticate(
      'jwt',
      { session: false },
      (err: Error, user: User, info: unknown) => {
        if (err || info || !user) {
          return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};
