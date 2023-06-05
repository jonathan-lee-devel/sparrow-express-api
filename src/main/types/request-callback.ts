import {NextFunction, Request, Response} from 'express';

/**
 * Request callback which is invoked by a HTTP controller upon successful request.
 */
export type RequestCallback =
    (req: Request, res: Response, next: NextFunction) => Promise<any>;
