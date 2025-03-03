import { envs } from "./config/plugins/env.plugin";
import { AppRoute } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main(){
    const {PORT, MONGO_DB_URL} = envs;

    const server = new Server({port: PORT, routes: AppRoute.routes});
    await server.start();
}