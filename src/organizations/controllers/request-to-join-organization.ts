import {RequestToJoinOrganizationFunction} from '../types/request-to-join-organization';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

/**
 * Closure for the HTTP controller which requests for the requesting user to join an organization.
 * @param {RequestToJoinOrganizationFunction} requestToJoinOrganization function which requests for the requesting user to join an organization
 * @return {HttpController} HTTP controller which requests for the requesting user to join an organization
 */
export const makeRequestToJoinOrganizationController = (
    requestToJoinOrganization: RequestToJoinOrganizationFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function requestToJoinOrganizationController(httpRequest: HttpRequest) {
    const requestToJoinOrganizationContainer = await requestToJoinOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: requestToJoinOrganizationContainer.status,
      jsonBody: requestToJoinOrganizationContainer.data,
    };
  };
};
