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
});
