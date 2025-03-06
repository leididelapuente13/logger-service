import { Container } from "inversify";
import { TYPES } from "./types";
import { MongoDatabase } from "../database/mongo/init";
import { LogController, LogDataSourceImpl, LogDto, LogRepositoryImpl, LogRouter } from "../../modules/infrastructure";
import { LogDataSource, LogRepository } from "../../modules/domain";
import { IDatabase } from "../interfaces/IDatabase";
import { CreateLogUseCase, FilterLogsUseCase, GetAllLogsUseCase } from "../../modules/application/usecases";
import { IUseCase, LogEntity } from "../../domain";
import { CONSTANTS } from "../constants/constants";
import { Server } from "../../modules/infrastructure/server";
import { AppRoute } from "../../modules/infrastructure/routes";


const container = new Container();

container.bind<IDatabase>(TYPES.DATABASE).to(MongoDatabase);
container.bind<LogRepository>(TYPES.LOG_REPOSITORY).to(LogRepositoryImpl);
container.bind<LogDataSource>(TYPES.LOG_DATASOURCE).to(LogDataSourceImpl);

container.bind<LogController>(TYPES.LOG_CONTROLLER).to(LogController);
container.bind<LogRouter>(TYPES.LOG_ROUTER).to(LogRouter);

container.bind<IUseCase<LogDto, LogEntity>>(TYPES.CREATE_LOG_USE_CASE).to(CreateLogUseCase);
container.bind<IUseCase<null, LogEntity[]>>(TYPES.GET_LOGS_USE_CASE).to(GetAllLogsUseCase);
container.bind<IUseCase<CONSTANTS.LogTypes, LogEntity[]>>(TYPES.FILTER_LOGS_USE_CASE).to(FilterLogsUseCase);
