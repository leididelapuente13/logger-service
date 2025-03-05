import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";
import { CONSTANTS } from "../../../infrastructure/constants/constants";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogDto, validateLogType } from "../../infrastructure/schema/log.schema";

export class FilterLogsUseCase implements IUseCase<CONSTANTS.LogTypes, LogEntity[]> {
    constructor(
        private readonly repository: LogRepository
    ) { }


    async execute(type: CONSTANTS.LogTypes): Promise<LogEntity[]> {
        const { success, data: logtype, error } = validateLogType(type);
        if (!success) throw (error);

        const filteredLogs = await this.repository.filterLogsByType(logtype);
        if(filteredLogs.length === 0) throw new Error('No logs found');
        return filteredLogs;
    }
}