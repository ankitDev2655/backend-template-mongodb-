import { createLogger, format, transports } from 'winston';
import util from 'node:util';
import path from 'node:path';
import config from '../../config/config.js';
import { EApplicationEnvironment } from '../constants/application.js';

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta } = info;

    const customLevel = String(level).toUpperCase();
    const customTimeStamp = String(timestamp);
    const customMessage = String(message);

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
    });

    const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\nMETA: ${customMeta}\n`;

    return customLog;
});

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta } = info;

    const logMeta: Record<string, unknown> = {};

    const metaObject = meta && typeof meta === 'object' ? (meta as Record<string, unknown>) : {};

    for (const [key, value] of Object.entries(metaObject)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack ?? '',
            };
        } else {
            logMeta[key] = value;
        }
    }

    const logData = {
        level: String(level).toUpperCase(),
        message: String(message),
        timestamp: String(timestamp),
        meta: logMeta,
    };

    return JSON.stringify(logData, null, 4);
});

const consoleTransport = () => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(
                    format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }),
                    consoleLogFormat
                ),
            }),
        ];
    }

    return [];
};

const fileTransport = () => {
    return [
        new transports.File({
            filename: path.join(process.cwd(), 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                fileLogFormat
            ),
        }),
    ];
};

export default createLogger({
    level: 'info',

    defaultMeta: {
        meta: {},
    },

    transports: [...fileTransport(), ...consoleTransport()],
});
