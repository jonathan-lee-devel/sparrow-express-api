import {body, ValidationChain} from 'express-validator';

export const removeOrganizationAdministratorValidationChain: ValidationChain[] = [
  body('administratorEmailToRemove', 'Must be a valid email address')
      .exists()
      .isEmail(),
];
