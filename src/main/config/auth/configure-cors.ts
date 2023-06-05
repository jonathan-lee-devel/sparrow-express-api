import cors from 'cors';
import bunyan from 'bunyan';

/**
 * CORS configuration.
 */
export const configureCors = (logger: bunyan) => {
  logger.info(`Configuring CORS origin set to: ${process.env.FRONT_END_URL}`);
  return cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
  });
};
