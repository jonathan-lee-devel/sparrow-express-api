import {makeGetProfileController} from './get-profile';
import {getProfile, updateProfile} from '../services';
import {makeUpdateProfileController} from './update-profile';

export const getProfileController =
    makeGetProfileController(getProfile);

export const updateProfileController =
    makeUpdateProfileController(updateProfile);
