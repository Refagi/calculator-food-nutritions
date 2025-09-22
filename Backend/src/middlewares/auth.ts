import passport from 'passport';
import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiErrors.js';
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../models/index.js';
import { User } from '@prisma/client';

type Resolve = (value?: void) => void;
type Reject = (reason?: any) => void;

const verifyCallback = (req: Request, resolve: Resolve, reject: Reject) => async (err: Error, user: User, info: unknown) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  resolve();
};

const auth = () => (req: Request, res: Response, next: NextFunction) =>
  new Promise<void>((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(
      req,
      res,
      next
    );
  })
    .then(() => next())
    .catch((err) => next(err));

export default auth;
