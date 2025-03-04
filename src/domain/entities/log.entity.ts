export enum LogType {
    POST    = 'post',
    GET     = 'get',
    PUT     = 'put',
    PATCH   = 'patch',
    DELETE  = 'delete',
    ERROR   = 'error',
    TRACE   = 'trace',
}

export interface Log {
    service: string;
    payload?: string;
    type: LogType;
    content?: string;
    date: Date;
}

export class LogEntity{

    public service: string;
    public payload?: string;
    public type: LogType;
    public content?: string;
    public date: Date;

    constructor(log: Log){
        const {service, payload, type, content, date} = log;

        this.service = service;
        this.payload = payload;
        this.type = type;
        this.content = content;
        this.date = date;
    }

    static fromJson(object:  { [key: string]: any }){
        return new LogEntity({
            service: object.service,
            payload: object.payload,
            type: object.type,
            content: object.content,
            date: object.date
        });
    }
}