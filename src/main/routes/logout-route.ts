import {Router} from 'express';
import bunyan from 'bunyan';
import {LoginStatus} from '../enums/login-status';
import {HttpStatus} from '../../common/enums/HttpStatus';

/**
 * Configuration for the user logout route.
 * @param {Router} router Express router to be configured
 * @param {bunyan} logger used for logging
 * @param {string} path path at which the endpoint is to be set
 */
export const configureLogoutRoute = (
    router: Router,
    logger: bunyan,
    path: string,
) => {
  router.post(path, (req, res, _next) => {
    req.logout((err) => {
      if (err) {
        logger.error(`An error has occurred during logout: ${err}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({logoutStatus: LoginStatus[LoginStatus.FAILURE]});
      }
    });
    return res.status(HttpStatus.OK).json({logoutStatus: LoginStatus[LoginStatus.SUCCESS]});
  });
};
