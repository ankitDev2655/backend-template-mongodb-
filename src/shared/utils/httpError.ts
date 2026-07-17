import { NextFunction, Request } from 'express';
import errorObject from './buildErrorResponse.js';

export default (nextFunc: NextFunction, err: unknown, req: Request, errorStatusCode: number = 500): never | void => {
    const errorObj = errorObject(err, req, errorStatusCode);

    return nextFunc(errorObj);
};
