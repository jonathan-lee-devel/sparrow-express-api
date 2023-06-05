import {StatusDataContainer} from '../../../../main/dtos/StatusDataContainer';

export type ReturnInternalServerErrorFunction =
    () => StatusDataContainer<undefined>;
