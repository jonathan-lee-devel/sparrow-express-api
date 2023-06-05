import {InviteToJoinOrganizationFunction} from '../types/invite-to-join-organization';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

/**
 * Closure for the HTTP controller which invites a given user to join an organization.
 * @param {InviteToJoinOrganizationFunction} inviteToJoinOrganization function which invites a given user to join an organization
 * @return {HttpController} HTTP controller which invites a given user to join an organization
 */
export const makeInviteToJoinOrganizationController = (
    inviteToJoinOrganization: InviteToJoinOrganizationFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function inviteToJoinOrganizationController(httpRequest: HttpRequest) {
    const inviteToJoinOrganizationContainer = await inviteToJoinOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
        httpRequest.body.emailToInvite,
    );
    return {
      httpStatus: inviteToJoinOrganizationContainer.status,
      jsonBody: inviteToJoinOrganizationContainer.data,
    };
  };
};
