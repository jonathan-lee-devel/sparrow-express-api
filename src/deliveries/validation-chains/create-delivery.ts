import {body, ValidationChain} from 'express-validator';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';

export const createDeliveryValidationChain: ValidationChain[] = [
  body('assignedDriverEmail', 'Must be a valid e-mail address')
      .exists()
      .isEmail(),
  body('organizationId', 'Must be a valid organization ID')
      .exists()
      .isLength({min: DEFAULT_ID_LENGTH, max: DEFAULT_ID_LENGTH}),
  body('title', 'Must be a valid title')
      .exists()
      .isLength({min: 1, max: 20}),
  body('details', 'Must be valid details')
      .exists()
      .isLength({min: 1, max: 50}),
  body('isDelivered', 'Must be true or false')
      .exists()
      .isBoolean({strict: true}),
];
