import { Container } from "inversify";
import { TYPES } from "./types";
import { MongoDatabase } from "../database/mongo/init";
import { LogRepositoryImpl } from "../../modules/infrastructure";
import { LogDataSource, LogRepository } from "../../modules/domain";
import { IDatabase } from "../interfaces/IDatabase";
import { IUseCase, LogEntity } from "../../domain";
import { CONSTANTS } from "../constants/constants";


const container = new Container();

container.bind<IDatabase>(TYPES.DATABASE).to(MongoDatabase);
container.bind<LogRepository>(TYPES.LOG_REPOSITORY).to(LogRepositoryImpl);
container.bind<LogDataSource>(TYPES.LOG_DATASOURCE).to(LogRepositoryImpl);
// container.bind<IUseCase<CONSTANTS.LogTypes, LogEntity>>(TYPES.FILTER_LOGS_USE_CASE).toConstantValue((context)=>{
//     const logRepository = new LogRepositoryImpl(context.container.get<LogDataSource>(TYPES.LOG_DATASOURCE));
// });


export default container;