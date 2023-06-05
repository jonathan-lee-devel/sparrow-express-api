import {makeCreateOrganizationController} from './create-organization';
import {
  approveRequestToJoinOrganization,
  createOrganization,
  getOrganization,
  getOrganizationInvitationByTokenValue,
  getOrganizationSnippet,
  getOrganizationsWhereInvolved,
  getRequestsToJoinOrganization,
  inviteToJoinOrganization,
  removeOrganizationAdministrator,
  removeOrganizationMember,
  requestToJoinOrganization,
  updateAdministratorJoinAsMember,
} from '../services';
import {makeGetOrganizationController} from './get-organization';
import {makeRequestToJoinOrganizationController} from './request-to-join-organization';
import {makeGetRequestsToJoinOrganizationController} from './get-requests-to-join-organization';
import {makeRemoveOrganizationMemberController} from './remove-organization-member';
import {makeApproveRequestToJoinOrganizationController} from './approve-request-to-join-organization';
import {makeRemoveOrganizationAdministratorController} from './remove-organization-administrator';
import {makeGetOrganizationsWhereInvolvedController} from './get-organizations-where-involved';
import {makeGetOrganizationSnippetController} from './get-organization-snippet';
import {makeInviteToJoinOrganizationController} from './invite-to-join-organization';
import {makeGetOrganizationInvitationByTokenValueController} from './get-organization-invitation-by-token-value';
import {makeUpdateAdministratorJoinAsMemberController} from './update-administrator-join-as-member';

export const createOrganizationController = makeCreateOrganizationController(createOrganization);

export const getOrganizationController = makeGetOrganizationController(getOrganization);

export const getOrganizationSnippetController = makeGetOrganizationSnippetController(getOrganizationSnippet);

export const getOrganizationsWhereInvolvedController =
    makeGetOrganizationsWhereInvolvedController(getOrganizationsWhereInvolved);

export const removeOrganizationAdministratorController =
    makeRemoveOrganizationAdministratorController(removeOrganizationAdministrator);

export const removeOrganizationMemberController = makeRemoveOrganizationMemberController(removeOrganizationMember);

export const getRequestsToJoinOrganizationController =
    makeGetRequestsToJoinOrganizationController(getRequestsToJoinOrganization);

export const requestToJoinOrganizationController = makeRequestToJoinOrganizationController(requestToJoinOrganization);

export const approveRequestToJoinOrganizationController =
    makeApproveRequestToJoinOrganizationController(approveRequestToJoinOrganization);

export const inviteToJoinOrganizationController =
    makeInviteToJoinOrganizationController(inviteToJoinOrganization);

export const getOrganizationInvitationByTokenValueController =
    makeGetOrganizationInvitationByTokenValueController(getOrganizationInvitationByTokenValue);

export const updateAdministratorJoinAsMemberController =
    makeUpdateAdministratorJoinAsMemberController(updateAdministratorJoinAsMember);
