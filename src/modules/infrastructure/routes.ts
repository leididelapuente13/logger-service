import { Router } from "express";
import { LogRouter } from "./routes/log.routes";
import { TYPES } from "../../infrastructure/containers/types";
import container from "../../infrastructure/containers/inversify";

export class AppRoute{

    static get routes(){
        const router = Router();
        const logRouter =  container.get<LogRouter>(TYPES.LOG_ROUTER);
        router.use('/api/logs', logRouter.routes);

        return router
    }

}