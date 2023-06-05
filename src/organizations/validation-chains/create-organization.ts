import {body, ValidationChain} from 'express-validator';

export const createOrganizationValidationChain: ValidationChain[] = [
  body('name', 'Must be a valid name of 1-30 characters')
      .exists()
      .isLength({min: 1, max: 30}),
];
