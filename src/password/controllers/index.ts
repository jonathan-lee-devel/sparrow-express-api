import {confirmPasswordReset, resetPassword} from '../services';
import {makeConfirmPasswordResetController} from './confirm-password-reset';
import {makeResetPasswordController} from './reset-password';

export const confirmPasswordResetController =
    makeConfirmPasswordResetController(confirmPasswordReset);

export const resetPasswordController =
    makeResetPasswordController(resetPassword);
