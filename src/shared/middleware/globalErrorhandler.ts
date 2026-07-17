import { NextFunction, Request, Response } from 'express';
import { THttpError } from '../types/types.js';

export default (err: THttpError, _req: Request, res: Response, _nextFunc: NextFunction) => {
    res.status(err.statusCode).json(err);
};
