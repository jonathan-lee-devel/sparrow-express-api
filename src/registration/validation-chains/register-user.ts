import {body, ValidationChain} from 'express-validator';

export const registerUserValidationChain: ValidationChain[] = [
  body('email', 'Only valid e-mail addresses are allowed')
      .exists()
      .isEmail(),
  body('firstName', 'A first name must be provided')
      .exists(),
  body('lastName', 'A last name must be provided')
      .exists(),
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
  body('acceptTermsAndConditions',
      'You must accept the terms and conditions to create an account')
      .exists()
      .isBoolean({strict: true})
      .custom((input) => {
        return input === true;
      }),
];
