import bunyan from 'bunyan';

const logger: bunyan = bunyan.createLogger({name: 'sparrow-express-api', src: true});
logger.info('Initializing application');

/**
 * Bunyan logger configuration.
 * @return {bunyan} logger
 */
export const loggerConfig = () => {
  return logger;
};
