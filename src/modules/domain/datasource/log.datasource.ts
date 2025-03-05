import { LogEntity } from "../../../domain/entities/log.entity";
import { CONSTANTS } from "../../../infrastructure/constants/constants";
import { LogDto } from "../../infrastructure/schema/log.schema";

export abstract class LogDataSource {
    abstract createLog(log: LogDto): Promise<LogEntity>;
    abstract getAllLogs(): Promise<LogEntity[]>;
    abstract filterLogsByType(type: CONSTANTS.LogTypes): Promise<LogEntity[]>;
}