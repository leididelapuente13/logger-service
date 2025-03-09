import { inject, injectable } from "inversify";
import { LogEntity, IUseCase} from "../../../domain";
import { LogRepository } from "../../domain";
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