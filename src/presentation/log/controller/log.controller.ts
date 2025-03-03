import { Request, Response } from "express";
import { validateLog } from "../../../domain/schema/log.schema";

export class LogController {

    async createLog({ body }: Request, res: Response) {

        try {
            const { service, payload, type, content, date } = body;
            const {success, data, error } = validateLog({ service, payload, type, content, date });
            if(!success){ 
                res.status(400).json({ error });
                return;
            }

            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getLogs(req: Request, res: Response) {
        try {
            res.status(200).json({ message: 'Get all logs' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async filterLogs({ params }: Request, res: Response) {
        try {
            const { type } = params;
            res.status(200).json({ type });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}