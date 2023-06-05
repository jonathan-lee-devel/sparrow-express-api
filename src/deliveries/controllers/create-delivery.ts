import {CreateDeliveryFunction} from '../types/create-delivery';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeCreateDeliveryController = (
    createDelivery: CreateDeliveryFunction,
): HttpController => {
  return async function createDeliveryController(httpRequest: HttpRequest) {
    const createDeliveryContainer = await createDelivery(
        httpRequest.user,
        httpRequest.body,
    );
    return {
      httpStatus: createDeliveryContainer.status,
      jsonBody: createDeliveryContainer.data,
    };
  };
};
