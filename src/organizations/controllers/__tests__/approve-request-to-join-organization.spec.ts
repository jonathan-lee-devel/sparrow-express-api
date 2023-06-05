import {makeApproveRequestToJoinOrganizationController} from '../approve-request-to-join-organization';
import {User} from '../../../main/models/User';
import {HttpRequest} from '../../../main/types/http-request';

describe('Approve Request to Join Organization Controller tests', () => {
  it('When makeApproveRequestToJoinOrganizationController Then approveRequestToJoinOrganizationController',
      async () => {
        const approveRequestToJoinOrganizationController = makeApproveRequestToJoinOrganizationController(
            // @ts-ignore
            () => {

            },
        );
        expect(approveRequestToJoinOrganizationController).not.toBeNull();
      });
  it('When HTTP parameters received Then parameters passed', async () => {
    let passedUser: User | undefined;
    let passedRequestToJoinOrganizationId = '';

    const approveRequestToJoinOrganizationController = makeApproveRequestToJoinOrganizationController(
        // @ts-ignore
        (requestingUser, organizationMembershipRequestId) => {
          passedUser = requestingUser;
          passedRequestToJoinOrganizationId = organizationMembershipRequestId;
          return {
            status: 200,
            data: {},
          };
        },
    );

    const requestingUser: User = {
      email: 'test@mail.com',
      emailVerified: true,
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    };
    const requestToJoinOrganizationId = '12345';
    const httpRequest: HttpRequest = {
      body: undefined,
      params: {
        requestToJoinOrganizationId,
      },
      user: requestingUser,
    };

    await approveRequestToJoinOrganizationController(httpRequest);

    expect(passedUser).toStrictEqual(requestingUser);
    expect(passedRequestToJoinOrganizationId).toStrictEqual(requestToJoinOrganizationId);
  });
  it('When status and data returned then HTTP status and JSON body set', async () => {
    const status = 200;
    const data = {test: 'test'};
    const approveRequestToJoinOrganizationController = makeApproveRequestToJoinOrganizationController(
        // @ts-ignore
        () => {
          return {
            status,
            data,
          };
        },
    );

    const httpRequest: HttpRequest = {
      body: undefined,
      params: {
        requestToJoinOrganizationId: '12345',
      },
      user: undefined,
    };

    const result = await approveRequestToJoinOrganizationController(httpRequest);

    expect(status).toStrictEqual(result.httpStatus);
    expect(data).toStrictEqual(result.jsonBody);
  });
});
