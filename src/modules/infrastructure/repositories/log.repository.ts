import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity } from "../../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogDto } from "../schema/log.schema";
import { CONSTANTS } from "../../../infrastructure/constants/constants";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/containers/types";

@injectable()
export class LogRepositoryImpl implements LogRepository {

    constructor(
        @inject(TYPES.LOG_DATASOURCE) private readonly datasource: LogDataSource
    ) {
    }

    async createLog(log: LogDto): Promise<LogEntity> {
        return await this.datasource.createLog(log);
    }

    async getAllLogs(): Promise<LogEntity[]> {
        return await this.datasource.getAllLogs();
    }

    async filterLogsByType(type: CONSTANTS.LogTypes): Promise<LogEntity[]> {
        return await this.datasource.filterLogsByType(type);
    }
}