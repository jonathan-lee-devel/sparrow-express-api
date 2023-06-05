import {body, ValidationChain} from 'express-validator';

export const updateProfileValidationChain: ValidationChain[] = [
  body('firstName', 'A first name must be provided')
      .exists(),
  body('lastName', 'A last name must be provided')
      .exists(),
];
