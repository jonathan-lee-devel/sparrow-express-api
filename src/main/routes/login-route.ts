import {Router} from 'express';
import passport from 'passport';
import bunyan from 'bunyan';
import {LoginStatus} from '../enums/login-status';
import {User} from '../models/User';
import {HttpStatus} from '../../common/enums/HttpStatus';

/**
 * Configuration for the user login route.
 * @param {Router} router Express router to be configured
 * @param {bunyan} logger used for logging
 * @param {string} path path at which the endpoint is to be set
 */
export const configureLoginRoute = (
    router: Router,
    logger: bunyan,
    path: string,
) => {
  router.post(path, (req, res, next) => {
    passport.authenticate('local', (err: any, user: User, _: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({loginStatus: LoginStatus[LoginStatus.FAILURE]});
      }

      req.login(user, (loginError) => {
        if (loginError) {
          return next(loginError);
        }
        logger.info(`Successful login for user with email: <${user.email}>`);
        return res.status(HttpStatus.OK).json({
          loginStatus: LoginStatus[LoginStatus.SUCCESS], user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      });
    })(req, res, next);
  });
};
