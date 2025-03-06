import { Router } from "express";
import { LogRouter } from "./routes/log.routes";
import container from "../../infrastructure/containers/inversify";

export class AppRoute{

    static get routes(){
        const router = Router();
        const logRouter = container.get(LogRouter);

        router.use('/api/logs', logRouter.routes);

        return router
    }

}