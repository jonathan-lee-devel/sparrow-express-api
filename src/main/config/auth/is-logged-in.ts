import {NextFunction, Request, Response} from 'express-serve-static-core';

/**
 * Is-logged-in middleware.
 * @param req request which is being processed
 * @param res response which is to be sent
 * @param next next function in the middleware
 */
export const isLoggedIn = (
    req: Request, res: Response, next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
      .status(401)
      .json({message: 'You must be logged in to access this resource'});
};
