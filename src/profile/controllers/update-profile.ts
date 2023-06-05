import {UpdateProfileFunction} from '../types/update-profile';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

/**
 * HTTP controller for requests to update user profile.
 * @param updateProfile function which actually processes request to update user profile
 */
export const makeUpdateProfileController = (
    updateProfile: UpdateProfileFunction,
): HttpController => {
  return async function updateProfileController(httpRequest: HttpRequest) {
    const profileContainer = await updateProfile(
        httpRequest.user,
        httpRequest.user.email,
        httpRequest.body.firstName,
        httpRequest.body.lastName,
    );
    return {
      httpStatus: profileContainer.status,
      jsonBody: profileContainer.data,
    };
  };
};
