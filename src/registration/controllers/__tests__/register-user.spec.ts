import {makeRegisterUserController} from '../register-user';
import {HttpRequest} from '../../../main/types/http-request';

describe('Register User Controller tests', () => {
  it('When makeRegisterUserController Then registerUserController', async () => {
    const registerUserController = makeRegisterUserController(
        // @ts-ignore
        () => {
        },
    );
    expect(registerUserController).not.toBeNull();
  });
  it('When HTTP parameters received Then parameters passed', async () => {
    let passedEmail = '';
    let passedFirstName = '';
    let passedLastName = '';
    let passedPassword = '';
    const registerUserController = makeRegisterUserController(
        // @ts-ignore
        (email, firstName, lastName, password) => {
          passedEmail = email;
          passedFirstName = firstName;
          passedLastName = lastName;
          passedPassword = password;
          return {
            status: 200,
            data: {},
          };
        },
    );

    const requestEmail = 'test@mail.com';
    const requestFirstName = 'John';
    const requestLastName = 'Doe';
    const requestPassword = 'password';
    const httpRequest: HttpRequest = {
      body: {
        email: requestEmail,
        firstName: requestFirstName,
        lastName: requestLastName,
        password: requestPassword,
      },
      params: undefined,
      user: undefined,
    };

    await registerUserController(httpRequest);

    expect(passedEmail).toStrictEqual(requestEmail);
    expect(passedFirstName).toStrictEqual(requestFirstName);
    expect(passedLastName).toStrictEqual(requestLastName);
    expect(passedPassword).toStrictEqual(requestPassword);
  });
  it('When status and data returned Then HTTP status and body set', async () => {
    const status = 200;
    const data = {test: 'test'};
    const registerUserController = makeRegisterUserController(
        // @ts-ignore
        () => {
          return {
            status,
            data,
          };
        },
    );

    const httpRequest: HttpRequest = {
      body: {
        email: 'test@mail.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
      },
      params: undefined,
      user: undefined,
    };

    const result = await registerUserController(httpRequest);

    expect(status).toStrictEqual(result.httpStatus);
    expect(data).toStrictEqual(result.jsonBody);
  });
});
