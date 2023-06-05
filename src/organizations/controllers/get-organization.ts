import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetOrganizationFunction} from '../types/get-organization';

/**
 * Closure for the HTTP controller which gets the organization data by ID.
 * @param {GetOrganizationFunction} getOrganization function which gets the organization data by ID
 * @return {HttpController} HTTP controller which gets the organization data by ID
 */
export const makeGetOrganizationController = (
    getOrganization: GetOrganizationFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function getOrganizationController(httpRequest: HttpRequest) {
    const organizationContainer = await getOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: organizationContainer.status,
      jsonBody: organizationContainer.data,
    };
  };
};
