import {ErrorDto} from '../../../../main/dtos/ErrorDto';

export type ErrorMessageToDtoFunction = (
    errorMessage: string,
) => ErrorDto;
