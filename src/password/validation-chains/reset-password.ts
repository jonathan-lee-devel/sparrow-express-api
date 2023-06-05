import {body, ValidationChain} from 'express-validator';

export const resetPasswordValidationChain: ValidationChain[] = [
  body('email', 'Only valid e-mail addresses are allowed')
      .exists()
      .isEmail(),
];
