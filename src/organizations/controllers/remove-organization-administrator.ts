import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {RemoveOrganizationAdministratorFunction} from '../types/remove-organization-administrator';

/**
 * Closure for the HTTP controller which removes an organization administrator.
 * @param {RemoveOrganizationAdministratorFunction} removeOrganizationAdministrator function which removes an organization administrator
 * @return {HttpController} HTTP controller which removes an organization administrator
 */
export const makeRemoveOrganizationAdministratorController = (
    removeOrganizationAdministrator: RemoveOrganizationAdministratorFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function removeOrganizationAdministratorController(httpRequest: HttpRequest) {
    const removeOrganizationAdministratorContainer = await removeOrganizationAdministrator(
        httpRequest.user,
        httpRequest.params.organizationId,
        httpRequest.body.administratorEmailToRemove,
    );
    return {
      httpStatus: removeOrganizationAdministratorContainer.status,
      jsonBody: removeOrganizationAdministratorContainer.data,
    };
  };
};
