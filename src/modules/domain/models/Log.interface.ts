import { CONSTANTS } from "../../../infrastructure/constants/constants";

export interface ILog {
    service: string;
    payload?: any;
    type: CONSTANTS.LogTypes;
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
