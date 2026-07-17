import { NextFunction, Request, Response } from 'express';
import { getHealthStatus } from './health.service.js';
import httpResponse from '../../shared/utils/sendHttpResponse.js';
import responseMessage from '../../shared/constants/responseMessage.js';
import httpError from '../../shared/utils/httpError.js';

export const getHealth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const response = getHealthStatus();
        httpResponse(req, res, 200, responseMessage.SUCCESS, response);
    } catch (error) {
        httpError(next, error, req, 500);
    }
};
