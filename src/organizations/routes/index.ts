import express from 'express';
import {configureRoute} from '../../main/routes/configure-route';
import {HttpRequestMethod} from '../../main/enums/http-request-method';
import {makeExpressCallback} from '../../main/express-callbacks/express-callback';
import {loggerConfig} from '../../main/config/logger/logger-config';
import {
  approveRequestToJoinOrganizationController,
  createOrganizationController,
  getOrganizationController,
  getOrganizationInvitationByTokenValueController,
  getOrganizationSnippetController,
  getOrganizationsWhereInvolvedController,
  getRequestsToJoinOrganizationController,
  inviteToJoinOrganizationController,
  removeOrganizationAdministratorController,
  removeOrganizationMemberController,
  requestToJoinOrganizationController,
  updateAdministratorJoinAsMemberController,
} from '../controllers';
import {createOrganizationValidationChain} from '../validation-chains/create-organization';
import {removeOrganizationMemberValidationChain} from '../validation-chains/remove-organization-member';
import {removeOrganizationAdministratorValidationChain} from '../validation-chains/remove-organization-administrator';
import {inviteToJoinOrganizationValidationChain} from '../validation-chains/invite-to-join-organization';

const router = express.Router();

const logger = loggerConfig();

configureRoute(router, HttpRequestMethod.POST, '/', true, createOrganizationValidationChain, makeExpressCallback(logger, createOrganizationController));

configureRoute(router, HttpRequestMethod.GET, '/where-involved', true, [], makeExpressCallback(logger, getOrganizationsWhereInvolvedController));

configureRoute(router, HttpRequestMethod.GET, '/:organizationId', true, [], makeExpressCallback(logger, getOrganizationController));

configureRoute(router, HttpRequestMethod.GET, '/:organizationId/snippet', true, [], makeExpressCallback(logger, getOrganizationSnippetController));

configureRoute(router, HttpRequestMethod.PUT, '/:organizationId/administrators/remove', true, removeOrganizationAdministratorValidationChain, makeExpressCallback(logger, removeOrganizationAdministratorController));

configureRoute(router, HttpRequestMethod.PUT, '/:organizationId/members/remove', true, removeOrganizationMemberValidationChain, makeExpressCallback(logger, removeOrganizationMemberController));

configureRoute(router, HttpRequestMethod.GET, '/requests-to-join/:organizationId', true, [], makeExpressCallback(logger, getRequestsToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.POST, '/request-to-join/:organizationId', true, [], makeExpressCallback(logger, requestToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.PUT, '/request-to-join/approve/:requestToJoinOrganizationId', true, [], makeExpressCallback(logger, approveRequestToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.POST, '/invite-to-join/:organizationId', true, inviteToJoinOrganizationValidationChain, makeExpressCallback(logger, inviteToJoinOrganizationController));

configureRoute(router, HttpRequestMethod.GET, '/invitations/tokenValue/:organizationInvitationTokenValue', true, [], makeExpressCallback(logger, getOrganizationInvitationByTokenValueController));

configureRoute(router, HttpRequestMethod.PUT, '/update-admin-join-as-member/:toJoinOrganizationId', true, [], makeExpressCallback(logger, updateAdministratorJoinAsMemberController));

export {router as OrganizationsRouter};
