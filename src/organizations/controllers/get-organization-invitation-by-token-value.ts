import {GetOrganizationInvitationByTokenValueFunction} from '../types/get-organization-invitation-by-token-value';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

/**
 * Closure for the HTTP controller which gets organization invitation data by token value.
 * @param {GetOrganizationInvitationByTokenValueFunction} getOrganizationInvitationByTokenValue function which gets organization invitation data by token value
 * @return {HttpController} HTTP controller which gets organization invitation data by token value
 */
export const makeGetOrganizationInvitationByTokenValueController = (
    getOrganizationInvitationByTokenValue: GetOrganizationInvitationByTokenValueFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function getOrganizationInvitationByTokenValueController(httpRequest: HttpRequest) {
    const organizationInvitationContainer = await getOrganizationInvitationByTokenValue(
        httpRequest.user,
        httpRequest.params.organizationInvitationTokenValue,
    );
    return {
      httpStatus: organizationInvitationContainer.status,
      jsonBody: organizationInvitationContainer.data,
    };
  };
};
