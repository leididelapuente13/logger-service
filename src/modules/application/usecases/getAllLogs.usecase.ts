import { injectable } from "inversify";
import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";
import { LogRepository } from "../../domain/repositories/log.repository";

@injectable()
export class GetAllLogsUseCase implements IUseCase<null, LogEntity[]> {
    constructor(
        private readonly repository: LogRepository
    ) { }


    async execute(): Promise<LogEntity[]> {
      return await this.repository.getAllLogs();
    }
}