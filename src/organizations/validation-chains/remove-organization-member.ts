import {body, ValidationChain} from 'express-validator';

export const removeOrganizationMemberValidationChain: ValidationChain[] = [
  body('memberEmailToRemove', 'Must be a valid email address')
      .exists()
      .isEmail(),
];
