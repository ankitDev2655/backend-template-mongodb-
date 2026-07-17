import { NextFunction, Request, Response } from 'express';
import httpError from '../utils/httpError.js';
import responseMessage from '../constants/responseMessage.js';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
    httpError(next, new Error(`${responseMessage.NOT_FOUND('Route')} ${req.originalUrl}`), req, 404);
};
