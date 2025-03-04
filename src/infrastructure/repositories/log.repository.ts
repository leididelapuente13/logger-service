import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogType } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogDto } from "../../domain/schema/log.schema";

export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly datasource: LogDataSource
    ) { }

    async createLog(log: LogDto): Promise<LogEntity> {
        return await this.datasource.createLog(log);
    }

    async getAllLogs(): Promise<LogEntity[]> {
        return this.datasource.getAllLogs();
    }

    async filterLogsByType(type: LogType): Promise<LogEntity[]> {
        return await this.datasource.filterLogsByType(type);
    }
}