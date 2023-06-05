import mongoose from 'mongoose';
import bunyan from 'bunyan';

const {connect} = mongoose;

/**
 * Connect-to-database functionality.
 * @param logger logger used for logging connection status
 */
export const connectToDatabase = (
    logger: bunyan,
) => {
  mongoose.set('strictQuery', true);
  connect(process.env.DATABASE_URL)
      .then((_) => {
        logger.info(
            `Connected to database: ${process.env.DATABASE_URL}`,
        );
      })
      .catch((err) => {
        logger.error(
            // eslint-disable-next-line max-len
            `Could not connect to database: ${process.env.DATABASE_URL} -> ${err}`,
        );
      });
};
