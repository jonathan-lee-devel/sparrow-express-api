import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {UpdateAdministratorJoinAsMemberFunction} from '../types/update-administrator-join-as-member';

/**
 * Closure for the joining of administrators as organization members HTTP controller.
 * @param {UpdateAdministratorJoinAsMemberFunction} updateAdministratorJoinAsMember function to allow administrators to join as members
 * @return {HttpController} HTTP controller which allows for administrators to join as organization members
 */
export const makeUpdateAdministratorJoinAsMemberController = (
    updateAdministratorJoinAsMember: UpdateAdministratorJoinAsMemberFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function updateAdministratorJoinAsMemberController(httpRequest: HttpRequest) {
    const updateAdministratorJoinAsMemberContainer = await updateAdministratorJoinAsMember(
        httpRequest.user,
        httpRequest.params.toJoinOrganizationId,
    );
    return {
      httpStatus: updateAdministratorJoinAsMemberContainer.status,
      jsonBody: updateAdministratorJoinAsMemberContainer.data,
    };
  };
};
