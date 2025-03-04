import { Request, Response } from "express";
import { validateLog, validateLogType } from "../../../domain/schema/log.schema";
import { LogRepository } from "../../../domain/repositories/log.repository";

export class LogController {

    constructor(
        private readonly repository: LogRepository
    ) { }

    async createLog({ body }: Request, res: Response) {
        try {
            const { service, payload, type, content, date } = body;
            const { success, data, error } = validateLog({ service, payload, type, content, date });
            if (!success) {
                res.status(400).json({ error });
                return;
            }

            await this.repository.createLog(data);
            res.status(201).json({ message: 'Log created' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getLogs(req: Request, res: Response) {
        try {
            const logs = await this.repository.getAllLogs();
            res.status(200).json({ data: logs });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
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
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}