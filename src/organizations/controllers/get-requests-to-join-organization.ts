import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetRequestsToJoinOrganizationFunction} from '../types/get-requests-to-join-organization';

/**
 * Closure for the HTTP controller which gets requests to join an organization.
 * @param {GetRequestsToJoinOrganizationFunction} getRequestsToJoinOrganization function which gets requests to join an organization
 * @return {HttpController} HTTP controller which gets requests to join an organization
 */
export const makeGetRequestsToJoinOrganizationController = (
    getRequestsToJoinOrganization: GetRequestsToJoinOrganizationFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function getRequestsToJoinOrganizationController(httpRequest: HttpRequest) {
    const requestsToJoinOrganizationContainer = await getRequestsToJoinOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: requestsToJoinOrganizationContainer.status,
      jsonBody: requestsToJoinOrganizationContainer.data,
    };
  };
};
