import { Request, Response } from "express";
import { validateLog, validateLogType } from "../schema/log.schema";
import { LogRepository } from "../../domain/repositories/log.repository";
import { formatLog } from "../../../utils/format-log.util";
import { FilterLogsUseCase } from "../../application/usecases/filterLogs.usecase";
import { CONSTANTS } from "../../../infrastructure/constants/constants";
import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";

export class LogController {

    constructor(
        private readonly repository: LogRepository,
        private readonly filterLogsUseCase: IUseCase<CONSTANTS.LogTypes, LogEntity[]>
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
           
            const log = await this.repository.createLog(data);

            res.status(201).json({ message: 'Log created', data: log });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async getAllLogs(req: Request, res: Response) {
        try {
            const logs = await this.repository.getAllLogs();
            res.status(200).json({ data: logs });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async filterLogs({ query }: Request, res: Response) {
        try {
            const { type } = query;
            const logs = await this.filterLogsUseCase.execute(type as CONSTANTS.LogTypes);
            res.status(200).json({ data: logs });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

}