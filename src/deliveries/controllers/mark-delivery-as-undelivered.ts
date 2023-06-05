import {MarkDeliveryAsUndeliveredFunction} from '../types/mark-delivery-as-undelivered';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeMarkDeliveryAsUndeliveredController = (
    markDeliveryAsUndelivered: MarkDeliveryAsUndeliveredFunction,
): HttpController => {
  return async function markDeliveryAsUndeliveredController(httpRequest: HttpRequest) {
    const markDeliveryAsUndeliveredContainer = await markDeliveryAsUndelivered(
        httpRequest.user,
        httpRequest.params.deliveryId,
    );
    return {
      httpStatus: markDeliveryAsUndeliveredContainer.status,
      jsonBody: markDeliveryAsUndeliveredContainer.data,
    };
  };
};
