import { Router } from "express";
import { LogController } from "../controller/log.controller";

export class logRouter {
    static get routes(): Router{

        const router = Router()

        const logController = new LogController();

        router.post('/', logController.createLog);

        return router;
    }
}