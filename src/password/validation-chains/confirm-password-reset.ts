import {body, ValidationChain} from 'express-validator';
import {DEFAULT_TOKEN_SIZE} from '../../util/token/default-token-size';

export const confirmPasswordResetValidationChain: ValidationChain[] = [
  body('password', 'Passwords must match and be at least 8 characters long')
      .exists()
      .isLength({min: 8})
      .custom((input, {req}) => {
        return input === req.body.confirmPassword;
      }),
  body('confirmPassword',
      'Passwords must match and be at least 8 characters long')
      .exists()
      .isLength({min: 8})
      .custom((input, {req}) => {
        return input === req.body.password;
      }),
  body('tokenValue',
      'Must provide a valid password reset token value')
      .exists()
      .isLength({min: DEFAULT_TOKEN_SIZE, max: DEFAULT_TOKEN_SIZE}),
];
