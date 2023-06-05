import {makeConfirmRegistrationController} from '../confirm-registration';
import {HttpRequest} from '../../../main/types/http-request';

describe('Confirm Registration Controller tests', () => {
  it('When makeConfirmRegistrationController Then confirmRegistrationController', async () => {
    const confirmRegistrationController = makeConfirmRegistrationController(
        // @ts-ignore
        () => {
        },
    );
    expect(confirmRegistrationController).not.toBeNull();
  });
  it('When HTTP parameters received Then parameters passed', async () => {
    let passedTokenValue = '';

    const confirmRegistrationController = makeConfirmRegistrationController(
        // @ts-ignore
        (tokenValue) => {
          passedTokenValue = tokenValue;
          return {
            status: 200,
            data: {},
          };
        },
    );

    const requestTokenValue = '12345';
    const httpRequest: HttpRequest = {
      body: {
        tokenValue: requestTokenValue,
      },
      params: undefined,
      user: undefined,
    };

    await confirmRegistrationController(httpRequest);

    expect(passedTokenValue).toStrictEqual(requestTokenValue);
  });
  it('When status and data returned Then HTTP status and body set', async () => {
    const status = 200;
    const data = {test: 'test'};
    const confirmRegistrationController = makeConfirmRegistrationController(
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
        tokenValue: '12345',
      },
      params: undefined,
      user: undefined,
    };

    const result = await confirmRegistrationController(httpRequest);

    expect(status).toStrictEqual(result.httpStatus);
    expect(data).toStrictEqual(result.jsonBody);
  });
});
