import winston from 'winston';
import 'winston-mongodb';
import expressWinston from 'express-winston';
import { Request, Response } from 'express';
import { Log, LogType } from "../../domain/entities/log.entity";
import { envs } from '../../config/plugins/env.plugin';

const customLevels = {
    levels: {
        error: 0,
        post: 1,
        get: 2,
        put: 3,
        patch: 4,
        delete: 5,
        trace: 6,
    }
}

const { MONGO_DB_URL } = envs;

export const logger = () => {
    return expressWinston.logger({
        transports: [
            new winston.transports.MongoDB({
                level: 'error',
                db: MONGO_DB_URL,
                collection: 'logs',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                )
            })
        ],
        format: winston.format.json(),
        meta: true,
        metaField: null,
        requestField: null,
        responseField: null,
        dynamicMeta: (req: Request, res: Response & { responseTime?: number }) => {
            const { method, body, url, headers, query, params, ip, protocol, hostname, originalUrl } = req;
            const { statusCode, statusMessage } = res;

            return ({
                service: req.url,
                payload: JSON.stringify({
                    method: method,
                    body: body,
                    query: query,
                    params: params,
                    ip: ip,
                    protocol: protocol,
                    hostname: hostname,
                    url: url,
                    originalUrl: originalUrl,
                }),
                type: method,
                content: JSON.stringify({
                    statusCode: statusCode,
                    statusMessage: statusMessage,
                    headers: headers,
                    responseTime: `${res.responseTime || 0}ms`,
                }),
            });
        }
    })
};

