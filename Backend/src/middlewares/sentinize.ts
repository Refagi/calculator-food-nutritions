import xss from 'xss';
import { Request, Response, NextFunction } from 'express';

const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return xss(obj); // sanitize string
  } else if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  } else if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {};
    for (const key in obj) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }
  return obj;
};

const xssSanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) req.body = sanitizeObject(req.body);

  if (req.query) {
    const sanitizedQuery: any = {};
    for (const key in req.query) {
      sanitizedQuery[key] = sanitizeObject(req.query[key]);
    }
    Object.assign(req.query, sanitizedQuery); // merge, bukan replace
  }

  if (req.params) {
    const sanitizedParams: any = {};
    for (const key in req.params) {
      sanitizedParams[key] = sanitizeObject(req.params[key]);
    }
    Object.assign(req.params, sanitizedParams);
  }

  if (req.cookies) req.cookies = sanitizeObject(req.cookies);

  next();
};


export default xssSanitizeMiddleware;
