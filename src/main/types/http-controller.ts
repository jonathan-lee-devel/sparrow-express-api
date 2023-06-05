import {HttpRequest} from './http-request';
import {HttpControllerResult} from './http-controller-result';

/**
 * HTTP controller used to process HTTP requests.
 */
export type HttpController
    = (httpRequest: HttpRequest) => Promise<HttpControllerResult>;
