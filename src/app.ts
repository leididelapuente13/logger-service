import { envs } from "./config/plugins/env.plugin";
import { MongoDatabase } from "./infrastructure/database/mongo/init";
import { AppRoute } from "./modules/infrastructure/routes";
import { Server } from "./modules/infrastructure/server";

(async () => {
  await main();
})();

async function main(){
    const {PORT, MONGO_DB_URL, MONGO_DB_NAME} = envs;

    const mongodb = new MongoDatabase();
    await mongodb.connect({mongo_uri: MONGO_DB_URL, database: MONGO_DB_NAME});
    
    const server = new Server({port: PORT, routes: AppRoute.routes});
    await server.start();
}