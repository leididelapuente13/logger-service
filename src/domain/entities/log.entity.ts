import { ILog, LogType } from "../../infrastructure/interfaces/Log.interface";

export class LogEntity{

    public service: string;
    public payload?: any;
    public type: LogType;
    public content?: {
        statusCode: number;
        statusMessage?: string;
        headers: any;
        url: string;
        method: string;
        ip: string;
    };
    public date: Date;

    constructor(log: ILog){
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