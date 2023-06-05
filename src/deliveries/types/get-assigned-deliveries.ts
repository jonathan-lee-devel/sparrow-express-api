import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {DeliveryDto} from '../dto/DeliveryDto';

export type GetAssignedDeliveriesFunction = (
    requestingUser: User,
) => Promise<StatusDataContainer<DeliveryDto[]>>;
