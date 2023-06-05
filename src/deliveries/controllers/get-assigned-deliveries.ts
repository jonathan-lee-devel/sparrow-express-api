import {GetAssignedDeliveriesFunction} from '../types/get-assigned-deliveries';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetAssignedDeliveriesController = (
    getAssignedDeliveries: GetAssignedDeliveriesFunction,
): HttpController => {
  return async function getAssignedDeliveriesController(httpRequest: HttpRequest) {
    const assignedDeliveriesContainer = await getAssignedDeliveries(
        httpRequest.user,
    );
    return {
      httpStatus: assignedDeliveriesContainer.status,
      jsonBody: assignedDeliveriesContainer.data,
    };
  };
};
