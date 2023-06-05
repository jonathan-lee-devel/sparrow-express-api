import {makeHandleExistingUser} from '../inner/handle-existing-user';

describe('Registration Service Handle Existing User Tests', () => {
  it('When makeHandleExistingUser Then handleExistingUser', async () => {
    const handleExistingUser = makeHandleExistingUser(
        // @ts-ignore
        () => {
        },
        {},
        {},
        {},
    );

    expect(handleExistingUser).not.toBeNull();
    expect(handleExistingUser).toBeInstanceOf(Function);
  });

  it('When user not exist Then tokens deleted', async () => {
    let registrationVerificationTokenIsDeleted = false;
    let passwordResetVerificationTokenIsDeleted = false;
    const handleExistingUser = makeHandleExistingUser(
        // @ts-ignore
        () => {
        },
        {
          findOne: () => {
            return undefined;
          },
        },
        {
          deleteOne: () => {
            registrationVerificationTokenIsDeleted = true;
          },
        },
        {
          deleteOne: () => {
            passwordResetVerificationTokenIsDeleted = true;
          },
        },
    );

    await handleExistingUser('test@mail.com');
    expect(registrationVerificationTokenIsDeleted).toBeTruthy();
    expect(passwordResetVerificationTokenIsDeleted).toBeTruthy();
  });
  it('When user exists and email is verified Then returns true', async () => {
    const handleExistingUser = makeHandleExistingUser(
        // @ts-ignore
        () => {
        },
        {
          findOne: () => {
            return {
              emailVerified: true,
            };
          },
        },
        {},
        {},
    );

    const result = await handleExistingUser('test@mail.com');
    expect(result).toBeTruthy();
  });
  it('When user exists and email is not verified Then returns false and items deleted', async () => {
    let userEmailDeleted = '';
    let registrationVerificationTokenEmailDeleted = '';
    let passwordResetVerificationTokenEmailDeleted = '';
    const handleExistingUser = makeHandleExistingUser(
        // @ts-ignore
        () => {
        },
        {
          findOne: async () => {
            return {
              emailVerified: false,
            };
          },
          deleteOne: async (deleteFilter) => {
            // @ts-ignore
            userEmailDeleted = deleteFilter.email;
          },
        },
        {
          deleteOne: async (deleteFilter) => {
            // @ts-ignore
            registrationVerificationTokenEmailDeleted = deleteFilter.userEmail;
          },
        },
        {
          deleteOne: async (deleteFilter) => {
            // @ts-ignore
            passwordResetVerificationTokenEmailDeleted = deleteFilter.userEmail;
          },
        },
    );

    const requestEmail = 'test@mail.com';
    const result = await handleExistingUser(requestEmail);

    expect(result).toBeFalsy();
    expect(userEmailDeleted).toStrictEqual(requestEmail);
    expect(registrationVerificationTokenEmailDeleted).toStrictEqual(requestEmail);
    expect(passwordResetVerificationTokenEmailDeleted).toStrictEqual(requestEmail);
  });
  it('When error is thrown Then error is caught and logged and false returned', async () => {
    const errorMessage = 'Error message';
    let loggedMessage = '';
    const handleExistingUser = makeHandleExistingUser(
        // @ts-ignore
        {
          // @ts-ignore
          error: (message) => {
            loggedMessage = message;
          },
        },
        {
          findOne: async () => {
            throw new Error(errorMessage);
          },
        },
        {},
        {},
    );

    const result = await handleExistingUser('test@mail.com');

    expect(result).toBeFalsy();
    expect(loggedMessage).toStrictEqual(`An error has occurred: Error: ${errorMessage}`);
  });
});
