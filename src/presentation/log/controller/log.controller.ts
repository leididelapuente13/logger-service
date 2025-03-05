import { Request, Response } from "express";
import { validateLog, validateLogType } from "../../../domain/schema/log.schema";
import { LogRepository } from "../../../domain/repositories/log.repository";
import { formatLog } from "../../../utils/format-log.util";

export class LogController {

    constructor(
        private readonly repository: LogRepository
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

    async getLogs(req: Request, res: Response) {
        try {
            const logs = await this.repository.getAllLogs();
            res.status(200).json({ data: logs });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async filterLogs({ params }: Request, res: Response) {
        try {
            const { type } = params;
            const {success, data: logtype, error} = validateLogType(type);

            if (!success) {
                res.status(400).json({ error });
                return;
            }

            const logs = await this.repository.filterLogsByType(logtype);
            res.status(200).json({ data: logs });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

}