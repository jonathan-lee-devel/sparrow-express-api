import {RemoveOrganizationMemberFunction} from '../types/remove-organization-member';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

/**
 * Closure for the HTTP controller which removes and organization member.
 * @param {RemoveOrganizationMemberFunction} removeOrganizationMember function which removes an organization member
 * @return {HttpController} HTTP controller which removes an organization member
 */
export const makeRemoveOrganizationMemberController = (
    removeOrganizationMember: RemoveOrganizationMemberFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function removeOrganizationMemberController(httpRequest: HttpRequest) {
    const removeOrganizationMemberContainer = await removeOrganizationMember(
        httpRequest.user,
        httpRequest.params.organizationId,
        httpRequest.body.memberEmailToRemove,
    );
    return {
      httpStatus: removeOrganizationMemberContainer.status,
      jsonBody: removeOrganizationMemberContainer.data,
    };
  };
};
