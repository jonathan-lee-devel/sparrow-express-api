import {makeCreateDeliveryController} from './create-delivery';
import {createDelivery, getAssignedDeliveries, markDeliveryAsDelivered, markDeliveryAsUndelivered} from '../services';
import {makeGetAssignedDeliveriesController} from './get-assigned-deliveries';
import {makeMarkDeliveryAsDeliveredController} from './mark-delivery-as-delivered';
import {makeMarkDeliveryAsUndeliveredController} from './mark-delivery-as-undelivered';

export const createDeliveryController = makeCreateDeliveryController(createDelivery);

export const getAssignedDeliveriesController = makeGetAssignedDeliveriesController(getAssignedDeliveries);

export const markDeliveryAsDeliveredController = makeMarkDeliveryAsDeliveredController(markDeliveryAsDelivered);

export const markDeliveryAsUndeliveredController = makeMarkDeliveryAsUndeliveredController(markDeliveryAsUndelivered);
