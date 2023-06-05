import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {DeliveryRequestDto} from '../dto/DeliveryRequestDto';
import {DeliveryDto} from '../dto/DeliveryDto';
import {User} from '../../main/models/User';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type CreateDeliveryFunction = (
    requestingUser: User,
    delivery: DeliveryRequestDto,
) => Promise<StatusDataContainer<DeliveryDto | ErrorDto>>;
