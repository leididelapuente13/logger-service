import { Request, Response } from "express";
import { LogDto, validateLog, validateLogType } from "../schema/log.schema";
import { LogRepository } from "../../domain/repositories/log.repository";
import { formatLog } from "../../../utils/format-log.util";
import { FilterLogsUseCase } from "../../application/usecases/filterLogs.usecase";
import { CONSTANTS } from "../../../infrastructure/constants/constants";
import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/containers/types";

@injectable()
export class LogController {

    constructor(
        @inject(TYPES.LOG_REPOSITORY) private readonly repository: LogRepository,
        @inject(TYPES.CREATE_LOG_USE_CASE) private readonly createLogUseCase: IUseCase<LogDto, LogEntity[]>,
        @inject(TYPES.GET_LOGS_USE_CASE) private readonly getAllLogsUseCase: IUseCase<null, LogEntity[]>,
        @inject(TYPES.FILTER_LOGS_USE_CASE) private readonly filterLogsUseCase: IUseCase<CONSTANTS.LogTypes, LogEntity[]>
    ) {
    }

    async createLog(req: Request, res: Response) {
        try {
            const formattedLog = formatLog(req, res);
            const { success, data, error } = validateLog(formattedLog);
            if (!success) {
                res.status(400).json({ error });
                return;
            }

            const log = await this.createLogUseCase.execute(data);

            res.status(201).json({ message: 'Log created', data: log });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async getLogs({ query }: Request, res: Response) {
        try {
            const { type } = query;

            if(!type){
                const filterLogs = this.getAllLogsUseCase.execute(null);
                res.status(200).json({ data: filterLogs });
                return;
            }

            const logs = await this.filterLogsUseCase.execute(type as CONSTANTS.LogTypes);
            res.status(200).json({ data: logs });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

}