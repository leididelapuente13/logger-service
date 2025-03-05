export enum LogType {
    POST    = 'post',
    GET     = 'get',
    PUT     = 'put',
    PATCH   = 'patch',
    DELETE  = 'delete',
    ERROR   = 'error',
    TRACE   = 'trace',
}

export interface ILog {
    service: string;
    payload?: any;
    type: LogType;
    content?: {
        statusCode: number;
        statusMessage?: string;
        headers: any;
        url: string;
        method: string;
        ip: string;
    };
    date: Date;
}

export type ILogCreate = Omit<ILog, 'date'>;
