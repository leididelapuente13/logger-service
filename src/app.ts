import { envs } from "./config/plugins/env.plugin";
import { MongoDatabase } from "./data/mongo/init";
import { AppRoute } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  await main();
})();

async function main(){
    const {PORT, MONGO_DB_URL, MONGO_DB_NAME} = envs;

    await MongoDatabase.connect({mongo_uri: MONGO_DB_URL, database: MONGO_DB_NAME});
    const server = new Server({port: PORT, routes: AppRoute.routes});
    await server.start();
}