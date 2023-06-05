import {CreateOrganizationFunction} from '../types/create-organization';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

/**
 * Closure for the creation of organizations HTTP controller.
 * @param {CreateOrganizationFunction} createOrganization function which creates the organization
 * @return {HttpController} HTTP controller which creates organizations
 */
export const makeCreateOrganizationController = (
    createOrganization: CreateOrganizationFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function createOrganizationController(httpRequest: HttpRequest) {
    const organizationContainer = await createOrganization(
        httpRequest.user,
        httpRequest.body.name,
    );
    return {
      httpStatus: organizationContainer.status,
      jsonBody: organizationContainer.data,
    };
  };
};
