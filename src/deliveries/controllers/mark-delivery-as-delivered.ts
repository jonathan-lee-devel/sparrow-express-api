import {MarkDeliveryAsDeliveredFunction} from '../types/mark-delivery-as-delivered';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeMarkDeliveryAsDeliveredController = (
    markDeliveryAsDelivered: MarkDeliveryAsDeliveredFunction,
): HttpController => {
  return async function markDeliveryAsDeliveredController(httpRequest: HttpRequest) {
    const markDeliveryAsDeliveredContainer = await markDeliveryAsDelivered(
        httpRequest.user,
        httpRequest.params.deliveryId,
    );
    return {
      httpStatus: markDeliveryAsDeliveredContainer.status,
      jsonBody: markDeliveryAsDeliveredContainer.data,
    };
  };
};
