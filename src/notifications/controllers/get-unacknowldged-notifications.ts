import {GetUnacknowledgedNotificationsFunction} from '../types/get-unacknowledged-notifications';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeGetUnacknowledgedNotificationsController = (
    getUnacknowledgedNotifications: GetUnacknowledgedNotificationsFunction,
): HttpController => {
  return async function getUnacknowledgedNotificationsController(httpRequest: HttpRequest) {
    const getUnacknowledgedNotificationsContainer = await getUnacknowledgedNotifications(
        httpRequest.user,
    );
    return {
      httpStatus: getUnacknowledgedNotificationsContainer.status,
      jsonBody: getUnacknowledgedNotificationsContainer.data,
    };
  };
};
