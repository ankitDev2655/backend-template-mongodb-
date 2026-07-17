import { Request, Response } from 'express';
import { THttpResponse } from '../types/types.js';
import config from '../../config/config.js';
import { EApplicationEnvironment } from '../constants/application.js';
import logger from '../logger/logger.js';

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, Data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: responseMessage,
        data: Data,
    };

    //Log
    logger.info(`CONTROLLER_RESPONSE`, {
        meta: response,
    });

    //Production Env
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }

    res.status(responseStatusCode).json(response);
};
