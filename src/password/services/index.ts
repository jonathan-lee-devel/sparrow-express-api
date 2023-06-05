import {makeGenerateSalt} from './generate-salt';
import {makeEncodePassword} from './encode-password';
// eslint-disable-next-line max-len
import {makeGeneratePasswordResetVerificationToken} from './generate-password-reset-verification-token';
// eslint-disable-next-line max-len
import {PasswordResetVerificationTokenModel} from '../models/PasswordResetVerificationToken';
import {makeResetPassword} from './reset-password';
import {UserModel} from '../../main/models/User';
import {makeConfirmPasswordReset} from './confirm-password-reset';
import {loggerConfig} from "../../main/config/logger/logger-config";
import {sendMail} from "../../util/email/exports";

const logger = loggerConfig();

const generateSalt = makeGenerateSalt();

export const encodePassword = makeEncodePassword(await generateSalt());

export const generatePasswordResetVerificationToken =
    makeGeneratePasswordResetVerificationToken(
        logger,
        PasswordResetVerificationTokenModel,
    );

export const resetPassword = makeResetPassword(
    logger,
    UserModel,
    PasswordResetVerificationTokenModel,
    generatePasswordResetVerificationToken,
    sendMail,
);

export const confirmPasswordReset = makeConfirmPasswordReset(
    logger,
    PasswordResetVerificationTokenModel,
    UserModel,
    encodePassword,
);
