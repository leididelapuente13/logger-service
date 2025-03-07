import { Request, Response } from "express";
import { LogDto, validateLog } from "../schema/log.schema";
import { formatLog } from "../../../utils/format-log.util";
import { CONSTANTS } from "../../../infrastructure/constants/constants";
import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/containers/types";
import { ValidationError } from "../../../domain/errors/ValidationError";
import { handleError, handleResponse } from "../../../domain/handlers";

@injectable()
export class LogController {

    constructor(
        @inject(TYPES.CREATE_LOG_USE_CASE) private readonly createLogUseCase: IUseCase<LogDto, LogEntity[]>,
        @inject(TYPES.GET_LOGS_USE_CASE) private readonly getAllLogsUseCase: IUseCase<void, LogEntity[]>,
        @inject(TYPES.FILTER_LOGS_USE_CASE) private readonly filterLogsUseCase: IUseCase<CONSTANTS.LogTypes, LogEntity[]>
    ) {
    }

    async createLog(req: Request, res: Response) {
        try {
            const formattedLog = formatLog(req, res);
            const { success, data, error } = validateLog(formattedLog);
            if (!success) throw new ValidationError(error)

            const log = await this.createLogUseCase.execute(data);

            handleResponse(res, { status: 201, message: 'Log created', data: log })
        } catch (error: any) {
            handleError(error, res)
        }
    }

    async getLogs({ query }: Request, res: Response) {
        try {
            const { type } = query;

            if (!type) {
                const logs = await this.getAllLogsUseCase.execute();
                handleResponse(res, { status: 200, message: 'Your logs', data: logs })
                return;
            }

            const filteredLogs = await this.filterLogsUseCase.execute(type as CONSTANTS.LogTypes);
            handleResponse(res, { status: 200, message: `logs with type ${type}`, data: filteredLogs })
        } catch (error: any) {
            handleError(error, res)
        }
    }

}