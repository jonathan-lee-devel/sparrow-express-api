import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {GetOrganizationsWhereInvolvedFunction} from '../types/get-organizations-where-involved';
import {User} from '../../main/models/User';
import {OrganizationDto} from '../dtos/OrganizationDto';
import {HttpStatus} from '../../common/enums/HttpStatus';

/**
 * Closure for the service function which obtains organizations in which the requesting user is involved.
 * @param {bunyan} logger used for logging
 * @param {Model<Organization>} OrganizationModel used to access organization data
 * @return {GetOrganizationsWhereInvolvedFunction} service function which obtains organizations in which the requesting user is involved
 */
export const makeGetOrganizationsWhereInvolved = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
): GetOrganizationsWhereInvolvedFunction => {
  /**
     * Service function which obtains organizations in which the requesting user is involved.
     * @param {User} requestingUser user making the request
     * @return {Promise<StatusDataContainer<OrganizationDto[]>>} organizations where the requesting user is involvedzs
     */
  return async function getOrganizationsWhereInvolved(
      requestingUser: User,
  ) {
    logger.info(`GET organizations where user with e-mail: <${requestingUser.email}> involved`);
    const organizationsWhereInvolvedModels: Organization[] = await OrganizationModel.find({
      $or: [
        {administratorEmails: {$all: [requestingUser.email]}},
        {memberEmails: {$all: [requestingUser.email]}},
      ],
    });

    const organizationDtos: OrganizationDto[] = [];
    for (const organizationModel of organizationsWhereInvolvedModels) {
      organizationDtos.push({
        id: organizationModel.id,
        name: organizationModel.name,
        administratorEmails: organizationModel.administratorEmails,
        memberEmails: organizationModel.memberEmails,
      });
    }
    return {
      status: HttpStatus.OK,
      data: organizationDtos,
    };
  };
};
