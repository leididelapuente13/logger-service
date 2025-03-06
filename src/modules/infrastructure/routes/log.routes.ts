import { Router } from "express";
import { LogController } from "../controller/log.controller";
import { LogRepositoryImpl } from "../repositories/log.repository";
import { LogDataSourceImpl } from "../datasources/log.datasource";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogRepository } from "../../domain/repositories/log.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/containers/types";

@injectable()
export class LogRouter {

    constructor(
        // @inject(TYPES.LOG_REPOSITORY) private logsRepository: LogRepository,
        @inject(TYPES.LOG_CONTROLLER) private logController: LogController 
    ) {
    }

    get routes(): Router {
        const router = Router();
        router.post('/', this.logController.createLog.bind(this.logController));
        router.get('/', this.logController.getLogs.bind(this.logController));
        return router;
    }
}