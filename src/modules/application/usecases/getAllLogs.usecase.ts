import { inject, injectable } from "inversify";
import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";
import { LogRepository } from "../../domain/repositories/log.repository";
import { TYPES } from "../../../infrastructure/containers/types";
import { NotFoundError } from "../../../domain/errors";

@injectable()
export class GetAllLogsUseCase implements IUseCase<void, LogEntity[]> {
    constructor(
        @inject(TYPES.LOG_REPOSITORY) private readonly repository: LogRepository
    ){} 

    async execute(): Promise<LogEntity[]> {
      const logs = await this.repository.getAllLogs();
      if(logs.length === 0) throw new NotFoundError("Could not find logs");
      return logs;
    }
}