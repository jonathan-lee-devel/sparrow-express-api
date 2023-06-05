import {makeGenerateRegistrationVerificationToken} from '../generate-registration-verification-token';

describe('Generate Registration Verification Token Tests', () => {
  it('When makeGenerateRegistrationVerificationToken Then generateRegistrationVerificationToken', async () => {
    const generateRegistrationVerificationToken = makeGenerateRegistrationVerificationToken(
        // @ts-ignore
        {},
        {},
    );

    expect(generateRegistrationVerificationToken).not.toBeNull();
    expect(generateRegistrationVerificationToken).toBeInstanceOf(Function);
  });
  it('When user token model not testable Then error logged return failure status', async () => {
    const errorMessage = 'TypeError: RegistrationVerificationTokenModel is not a constructor';
    let loggedMessage;
    const generateRegistrationVerificationToken = makeGenerateRegistrationVerificationToken(
        // @ts-ignore
        {
          // @ts-ignore
          error: (message) => {
            loggedMessage = message;
          },
        },
        {},
    );

    const result = await generateRegistrationVerificationToken(
        16,
        15,
        'test@mail.com',
    );

    expect(loggedMessage).toStrictEqual(`An error has occurred: ${errorMessage}`);
    expect(result.status).toStrictEqual(500);
    expect(result.data).toBeUndefined();
  });
});
