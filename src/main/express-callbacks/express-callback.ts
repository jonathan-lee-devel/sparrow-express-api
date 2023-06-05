import bunyan from 'bunyan';
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {HttpController} from '../types/http-controller';
import {HttpRequest} from '../types/http-request';
import {HttpControllerResult} from '../types/http-controller-result';

/**
 * Express callback design pattern.
 * @param logger logger used to log status of response
 * @param httpController controller which is invoked upon request
 */
export const makeExpressCallback = (
    logger: bunyan,
    httpController: HttpController,
) => {
  return async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const httpRequest: HttpRequest = {
      user: req.user,
      params: req.params,
      body: req.body,
    };
    httpController(httpRequest)
        .then((httpControllerResult: HttpControllerResult) => {
          return res
              .status(httpControllerResult.httpStatus)
              .json(httpControllerResult.jsonBody);
        })
        .catch((err) => {
          logger.error(`An error has occurred: ${err}`);
          return res
              .status(500)
              .send();
        },
        );
  };
};
