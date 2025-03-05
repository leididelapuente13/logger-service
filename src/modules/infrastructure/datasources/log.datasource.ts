import { LogModel } from "../models/log.model";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity } from "../../../domain/entities/log.entity";
import { LogDto } from "../schema/log.schema";
import { CONSTANTS } from "../../../infrastructure/constants/constants";

export class LogDataSourceImpl implements LogDataSource {
    async createLog(log: LogDto): Promise<LogEntity> {
        const createdLog = await LogModel.create(log);
        return LogEntity.fromJson(createdLog);
    }

    async getAllLogs(): Promise<LogEntity[]> {
        const logs = await LogModel.find();
        return logs.map(log => LogEntity.fromJson(log));
    }

    async filterLogsByType(type: CONSTANTS.LogTypes): Promise<LogEntity[]> {
        const filteredLogs = await LogModel.find({type: type});
        return filteredLogs.map(log => LogEntity.fromJson(log));
    }
}
