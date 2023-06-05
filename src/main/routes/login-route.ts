import {Router} from 'express';
import passport from 'passport';
import bunyan from 'bunyan';
import {LoginStatus} from '../enums/login-status';

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
    passport.authenticate('local', (err, user, _) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({loginStatus: LoginStatus[LoginStatus.FAILURE]});
      }

      req.login(user, (loginError) => {
        if (loginError) {
          return next(loginError);
        }
        logger.info(`Successful login for user with email: <${user.email}>`);
        return res.status(200).json({
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
