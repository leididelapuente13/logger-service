import { Router } from "express";
import { LogController } from "../controller/log.controller";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/containers/types";

@injectable()
export class LogRouter {

    constructor(
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