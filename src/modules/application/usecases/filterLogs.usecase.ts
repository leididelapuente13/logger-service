import { inject, injectable } from "inversify";
import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";
import { CONSTANTS } from "../../../infrastructure/constants/constants";
import { LogRepository } from "../../domain/repositories/log.repository";
import { validateLogType } from "../../infrastructure/schema/log.schema";
import { TYPES } from "../../../infrastructure/containers/types";
import { NotFoundError } from "../../../domain/errors";
import { ValidationError } from "../../../domain/errors/ValidationError";

@injectable()
export class FilterLogsUseCase implements IUseCase<CONSTANTS.LogTypes, LogEntity[]> {
    constructor(
         @inject(TYPES.LOG_REPOSITORY) private readonly repository: LogRepository
    ) { }


    async execute(type: CONSTANTS.LogTypes): Promise<LogEntity[]> {
        const { success, data: logtype, error } = validateLogType(type);
        if (!success) throw new ValidationError(error);

        const filteredLogs = await this.repository.filterLogsByType(logtype);
        if(filteredLogs.length === 0) throw new NotFoundError(`Could not find logs with type ${logtype}`);
        return filteredLogs;
    }
}