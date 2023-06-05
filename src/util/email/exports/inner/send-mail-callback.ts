import bunyan from 'bunyan';
import {SentMessageInfo} from 'nodemailer';
import {SendMailCallbackFunction} from '../../types/inner/send-mail-callback';

export const makeSendMailCallback = (
    logger: bunyan,
): SendMailCallbackFunction => {
  return function sendMailCallback(
      err: Error | null,
      info: SentMessageInfo,
  ) {
    if (err) {
      logger.error(err);
      return false;
    }
    logger.info(`E-mail sent to with response: ${info.response}`);
    return true;
  };
};
