import { Router } from "express";
import { LogRouter } from "./log/routes/log.routes";

export class AppRoute{

    static get routes(){
        const router = Router();
        const logRouter = new LogRouter();

        router.use('/api/logs', logRouter.routes);

        return router
    }

}