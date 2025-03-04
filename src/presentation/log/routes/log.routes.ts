import { Router } from "express";
import { LogController } from "../controller/log.controller";
import { expressLogger } from "../../../infrastructure/middleware/logger.middleware";

export class logRouter {
    static get routes(): Router{

        const router = Router()

        const logController = new LogController();

        router.post('/', logController.createLog);
        // router.get('/', expressLogger());

        return router;
    }
}