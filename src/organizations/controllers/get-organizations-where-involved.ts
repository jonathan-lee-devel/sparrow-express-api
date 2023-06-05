import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetOrganizationsWhereInvolvedFunction} from '../types/get-organizations-where-involved';

/**
 * Closure for the HTTP controller which gets all organizations where the requesting user is involved.
 * @param {GetOrganizationsWhereInvolvedFunction} getOrganizationsWhereInvolved function which gets all organizations where the requesting user is involved
 * @return {HttpController} HTTP controller which gets all organizations where the requesting user is involved
 */
export const makeGetOrganizationsWhereInvolvedController = (
    getOrganizationsWhereInvolved: GetOrganizationsWhereInvolvedFunction,
): HttpController => {
  /**
     * HTTP controller function which processes the HTTP requests passed to the assigned route.
     * @param {HttpRequest} httpRequest HTTP request to be processed
     * @return {Promise<HttpControllerResult>} HTTP status and JSON body obtained from the called service
     */
  return async function getOrganizationsWhereInvolvedController(httpRequest: HttpRequest) {
    const organizationsContainer = await getOrganizationsWhereInvolved(
        httpRequest.user,
    );

    return {
      httpStatus: organizationsContainer.status,
      jsonBody: organizationsContainer.data,
    };
  };
};
