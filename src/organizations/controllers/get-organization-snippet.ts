import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetOrganizationSnippetFunction} from '../types/get-organization-snippet';

/**
 * Closure for the HTTP controller which gets organization snippet data by ID.
 * @param {GetOrganizationSnippetFunction} getOrganizationSnippet function which gets organization snippet data by ID
 * @return {HttpController} HTTP controller which gets organization snippet data by ID
 */
export const makeGetOrganizationSnippetController = (
    getOrganizationSnippet: GetOrganizationSnippetFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function getOrganizationSnippetController(httpRequest: HttpRequest) {
    const organizationContainer = await getOrganizationSnippet(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: organizationContainer.status,
      jsonBody: organizationContainer.data,
    };
  };
};
