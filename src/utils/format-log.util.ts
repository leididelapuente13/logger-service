import { Request, Response } from "express";
import { LogType } from "../infrastructure/interfaces/Log.interface";

export const formatLog = (req: Request, res: Response) => {
    const { body, method,  headers, ip, baseUrl} = req;
    const { statusCode, statusMessage} = res;
    const { type, service, payload } = body;

    const log = {
        service: service,
        payload: payload,
        type: type as LogType,
        content: {
            statusCode: statusCode,
            statusMessage: statusMessage,
            headers: headers,
            url: baseUrl,
            method: method,
            ip: ip,
        },
    }
    
    return log;
}