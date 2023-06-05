import expressSession from 'express-session';
import bunyan from 'bunyan';

/**
 * Express Session configuration.
 */
export const configureExpressSession = (logger: bunyan) => {
  logger.info('Configuring express session with provided secret');
  return expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });
};

