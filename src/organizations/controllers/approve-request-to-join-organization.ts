import {ApproveRequestToJoinOrganizationFunction} from '../types/approve-request-to-join-organization';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

/**
 * Closure for the approval of requests to join organization HTTP controller.
 * @param {ApproveRequestToJoinOrganizationFunction} approveRequestToJoinOrganization function which approves requests to join organization
 * @return {HttpController} HTTP controller which approves requests to join organization
 */
export const makeApproveRequestToJoinOrganizationController = (
    approveRequestToJoinOrganization: ApproveRequestToJoinOrganizationFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function approveRequestToJoinOrganizationController(httpRequest: HttpRequest) {
    const approveRequestToJoinOrganizationContainer = await approveRequestToJoinOrganization(
        httpRequest.user,
        httpRequest.params.requestToJoinOrganizationId,
    );
    return {
      httpStatus: approveRequestToJoinOrganizationContainer.status,
      jsonBody: approveRequestToJoinOrganizationContainer.data,
    };
  };
};
