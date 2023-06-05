import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetNotificationByIdFunction} from '../types/get-notification-by-id';

export const makeGetNotificationByIdController = (
    getNotificationById: GetNotificationByIdFunction,
): HttpController => {
  return async function getNotificationByIdController(httpRequest: HttpRequest) {
    const getNotificationByIdContainer = await getNotificationById(
        httpRequest.user,
        httpRequest.params.notificationId,
    );
    return {
      httpStatus: getNotificationByIdContainer.status,
      jsonBody: getNotificationByIdContainer.data,
    };
  };
};
