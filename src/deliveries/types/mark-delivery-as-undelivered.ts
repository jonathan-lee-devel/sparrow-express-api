import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {DeliveryDto} from '../dto/DeliveryDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type MarkDeliveryAsUndeliveredFunction = (
    requestingUser: User,
    deliveryId: string,
) => Promise<StatusDataContainer<DeliveryDto | ErrorDto>>;
