import { Log, LogEntity, LogType } from "../entities/log.entity";
import { LogDto } from "../schema/log.schema";

export abstract class LogDataSource {
    abstract createLog(log: LogDto): Promise<Log>;
    abstract getAllLogs(): Promise<LogEntity[]>;
    abstract filterLogsByType(type: LogType): Promise<LogEntity[]>;
}