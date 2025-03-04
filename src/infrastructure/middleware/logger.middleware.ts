import winston from 'winston';
import expressWinston from 'express-winston';
import { Request, Response } from 'express';
import { Log, LogType } from "../../domain/entities/log.entity";
import { logger } from '../../config/plugins/logger.plugin';

export const expressLogger = () => {
    return expressWinston.logger({
        winstonInstance: logger,
        meta: true,
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
                type: method.toLowerCase(),
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