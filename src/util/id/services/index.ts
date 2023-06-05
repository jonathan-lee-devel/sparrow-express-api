import {makeGenerateId} from './generate-id';
import {loggerConfig} from '../../../main/config/logger/logger-config';

const logger = loggerConfig();

export const generatedId = makeGenerateId(logger);
