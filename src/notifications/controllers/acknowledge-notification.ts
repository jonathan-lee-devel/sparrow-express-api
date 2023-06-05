import {AcknowledgeNotificationFunction} from '../types/acknowledge-notification';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeAcknowledgeNotificationController = (
    acknowledgeNotification: AcknowledgeNotificationFunction,
): HttpController => {
  return async function acknowledgeNotificationController(httpRequest: HttpRequest) {
    const acknowledgeNotificationContainer = await acknowledgeNotification(
        httpRequest.user,
        httpRequest.params.notificationId,
    );
    return {
      httpStatus: acknowledgeNotificationContainer.status,
      jsonBody: acknowledgeNotificationContainer.data,
    };
  };
};
