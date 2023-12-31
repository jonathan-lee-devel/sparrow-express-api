import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Delivery} from '../models/Delivery';
import {GetAssignedDeliveriesFunction} from '../types/get-assigned-deliveries';
import {User} from '../../main/models/User';
import {DeliveryDto} from '../dto/DeliveryDto';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeGetAssignedDeliveries = (
    logger: bunyan,
    DeliveryModel: Model<Delivery>,
): GetAssignedDeliveriesFunction => {
  return async function getAssignedDeliveries(
      requestingUser: User,
  ) {
    logger.info(`Request to get all deliveries assigned to user with e-mail: <${requestingUser.email}>`);
    const deliveryModels = await DeliveryModel.find({assignedDriverEmail: requestingUser.email}, {__v: 0});
    const deliveryDtos: DeliveryDto[] = [];
    for (const deliveryModel of deliveryModels) {
      deliveryDtos.push({
        id: (await deliveryModel).id,
        creatorEmail: (await deliveryModel).creatorEmail,
        assignedDriverEmail: (await deliveryModel).assignedDriverEmail,
        organizationId: (await deliveryModel).organizationId,
        title: (await deliveryModel).title,
        details: (await deliveryModel).details,
        isDelivered: (await deliveryModel).isDelivered,
      });
    }

    return {
      status: HttpStatus.OK,
      data: deliveryDtos,
    };
  };
};
