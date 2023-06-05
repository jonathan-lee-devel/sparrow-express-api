import bunyan from 'bunyan';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {Model} from 'mongoose';
import {Delivery} from '../models/Delivery';
import {CreateDeliveryFunction} from '../types/create-delivery';
import {DeliveryRequestDto} from '../dto/DeliveryRequestDto';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {returnForbidden, returnInternalServerError} from '../../common/use-cases/status-data-container';
import {User} from '../../main/models/User';
import {Organization} from '../../organizations/models/Organization';
import {errorMessageToDto} from '../../common/use-cases/errors';

export const makeCreateDelivery = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    OrganizationModel: Model<Organization>,
    DeliveryModel: Model<Delivery>,
): CreateDeliveryFunction => {
  return async function createDelivery(
      requestingUser: User,
      delivery: DeliveryRequestDto,
  ) {
    logger.info(`Request to create new delivery from user with e-mail: <${requestingUser.email}>`);
    const organizationModel = await OrganizationModel.findOne({id: delivery.organizationId}, {__v: 0});
    if (!organizationModel) {
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${delivery.organizationId} does not exist`),
      };
    }

    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }

    const newDelivery: Delivery = {
      id: await generateId(DEFAULT_ID_LENGTH),
      creatorEmail: requestingUser.email,
      ...delivery,
    };

    try {
      await new DeliveryModel(newDelivery).save();
      logger.info(`Successfully created new delivery with ID: ${newDelivery.id}`);
      return {
        status: 201,
        data: {
          ...newDelivery,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
