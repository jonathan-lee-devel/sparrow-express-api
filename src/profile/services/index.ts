import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeGetProfile} from './get-profile';
import {UserModel} from '../../main/models/User';
import {makeUpdateProfile} from './update-profile';

const logger = loggerConfig();

export const getProfile = makeGetProfile(
    logger,
    UserModel,
);

export const updateProfile = makeUpdateProfile(
    logger,
    UserModel,
);
