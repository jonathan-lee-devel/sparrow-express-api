import {GetAllNotificationsFunction} from '../types/get-all-notifications';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetAllNotificationsController = (
    getAllNotifications: GetAllNotificationsFunction,
): HttpController => {
  return async function getAllNotificationsController(httpRequest: HttpRequest) {
    const getAllNotificationsContainer = await getAllNotifications(
        httpRequest.user,
    );
    return {
      httpStatus: getAllNotificationsContainer.status,
      jsonBody: getAllNotificationsContainer.data,
    };
  };
};
