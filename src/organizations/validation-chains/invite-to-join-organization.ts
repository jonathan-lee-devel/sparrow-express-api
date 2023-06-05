import {body, ValidationChain} from 'express-validator';

export const inviteToJoinOrganizationValidationChain: ValidationChain[] = [
  body('emailToInvite', 'Must be a valid e-mail address')
      .exists()
      .isEmail(),
];
