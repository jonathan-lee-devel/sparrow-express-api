import {makeRegisterUser} from '../register-user';
import {RegistrationStatus} from '../../enums/RegistrationStatus';

describe('Registration Service Register User Tests', () => {
  it('When makeRegisterUser Then registerUser', async () => {
    // @ts-ignore
    const registerUser = makeRegisterUser(
        {},
        () => {
        },
        () => {
        },
        () => {
        },
        () => {
        },
        {},
    );

    expect(registerUser).not.toBeNull();
    expect(registerUser).toBeInstanceOf(Function);
  });
  it('When handleExistingUser returns true Then return conflict status', async () => {
    // @ts-ignore
    const registerUser = makeRegisterUser(
        {},
        () => {
          return true;
        },
        () => {
        },
        () => {
        },
        () => {
        },
        {},
    );

    const result = await registerUser('test@mail.com', 'John', 'Doe', 'password');

    expect(result.status).toStrictEqual(409);
    expect(result.data).toStrictEqual({
      status: RegistrationStatus[RegistrationStatus.USER_ALREADY_EXISTS],
    });
  });
  it('When handleExistingUser returns false and password token fails Then return failure status', async () => {
    // @ts-ignore
    const registerUser = makeRegisterUser(
        {},
        () => {
          return false;
        },
        () => {
          return {
            status: 201,
          };
        },
        () => {
          return {
            status: 500,
          };
        },
        () => {
        },
        {},
    );

    const result = await registerUser('test@mail.com', 'John', 'Doe', 'password');

    expect(result.status).toStrictEqual(500);
    expect(result.data).toStrictEqual({
      status: RegistrationStatus[RegistrationStatus.FAILURE],
    });
  });
});
