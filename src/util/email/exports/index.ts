import {makeSendMailCallback} from './inner/send-mail-callback';
import {transporterConfig} from '../config/Email';
import {makeSendMail} from './send-mail';
import {makeVerifyEmail} from './verify-email';
import {loggerConfig} from '../../../main/config/logger/logger-config';

const logger = loggerConfig();

export const sendMail = makeSendMail(
    logger,
    transporterConfig(),
    makeSendMailCallback(logger),
);

export const verifyEmail = makeVerifyEmail();
