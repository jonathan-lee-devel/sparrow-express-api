import {makeConfirmRegistrationController} from './confirm-registration';
import {confirmRegistration, registerUser} from '../services';
import {makeRegisterUserController} from './register-user';

export const registerUserController =
    makeRegisterUserController(registerUser);

export const confirmRegistrationController =
    makeConfirmRegistrationController(confirmRegistration);
