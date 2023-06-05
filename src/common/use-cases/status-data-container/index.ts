import {makeReturnNotFound} from './return-not-found';
import {makeReturnForbidden} from './return-forbidden';
import {makeReturnInternalServerError} from './return-internal-server-error';
import {loggerConfig} from '../../../main/config/logger/logger-config';

const logger = loggerConfig();

export const returnNotFound = makeReturnNotFound();

export const returnForbidden = makeReturnForbidden(logger);

export const returnInternalServerError =
    makeReturnInternalServerError();
