import {LogEntity, LogType } from "../entities/log.entity";
import { LogDto } from "../schema/log.schema";

export abstract class LogRepository {
    abstract createLog(log: LogDto): Promise<LogEntity>;
    abstract getAllLogs(): Promise<LogEntity[]>;
    abstract filterLogsByType(type: LogType): Promise<LogEntity[]>;
}