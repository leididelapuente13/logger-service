import { Router } from "express";
import { logRouter } from "./log/routes/log.routes";

export class AppRoute{

    static get routes(){
        const router = Router();

        router.use('/api/logs', logRouter.routes);

        return router
    }

}