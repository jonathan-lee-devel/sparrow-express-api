import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Delivery} from '../models/Delivery';
import {Organization} from '../../organizations/models/Organization';
import {MarkDeliveryAsUndeliveredFunction} from '../types/mark-delivery-as-undelivered';
import {User} from '../../main/models/User';
import {returnForbidden, returnNotFound} from '../../common/use-cases/status-data-container';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {HttpStatus} from '../../common/enums/HttpStatus';

export const makeMarkDeliveryAsUndelivered = (
    logger: bunyan,
    DeliveryModel: Model<Delivery>,
    OrganizationModel: Model<Organization>,
): MarkDeliveryAsUndeliveredFunction => {
  return async function markDeliveryAsUndelivered(
      requestingUser: User,
      deliveryId: string) {
    logger.info(`Request for user with e-mail: <${requestingUser.email}> to mark delivery with ID: ${deliveryId} as undelivered`);
    const deliveryModel = await DeliveryModel
        .findOne({id: deliveryId}, {__v: 0});
    if (!deliveryModel) {
      return returnNotFound();
    }

    const organizationModel: Organization = await OrganizationModel
        .findOne({id: deliveryModel.organizationId}, {__v: 0});
    if (!organizationModel) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto('Organization ID for delivery does not exist'),
      };
    }
    if (deliveryModel.assignedDriverEmail !== requestingUser.email ||
                !organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    if (!deliveryModel.isDelivered) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: errorMessageToDto('Delivery already marked as undelivered'),
      };
    }
    deliveryModel.isDelivered = false;
    await deliveryModel.save();
    return {
      status: HttpStatus.OK,
      data: {
        id: deliveryModel.id,
        isDelivered: deliveryModel.isDelivered,
        details: deliveryModel.details,
        title: deliveryModel.title,
        creatorEmail: deliveryModel.creatorEmail,
        organizationId: deliveryModel.organizationId,
        assignedDriverEmail: deliveryModel.assignedDriverEmail,
      },
    };
  };
};
