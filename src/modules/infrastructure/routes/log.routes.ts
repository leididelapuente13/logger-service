import { Router } from "express";
import { LogController } from "../controller/log.controller";
import { LogRepositoryImpl } from "../repositories/log.repository";
import { LogDataSourceImpl } from "../datasources/log.datasource";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRouter {

    private logsMongoDataSource : LogDataSource;
    private logsRepository : LogRepository;
    private logController : LogController;

    constructor(){
        this.logsMongoDataSource = new LogDataSourceImpl();
        this.logsRepository = new LogRepositoryImpl(this.logsMongoDataSource);
        this.logController = new LogController(this.logsRepository);
    }

    get routes(): Router{
        const router = Router();

        router.post('/', this.logController.createLog.bind(this.logController));
        // router.get('/', this.logController.getAllLogs.bind(this.logController));
        router.get('/', this.logController.filterLogs.bind(this.logController));

        return router;
    }
}