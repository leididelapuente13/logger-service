import { inject, injectable } from "inversify";
import { LogEntity } from "../../../domain/entities/log.entity";
import { IUseCase } from "../../../domain/usecase/usecase";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogDto } from "../../infrastructure/schema/log.schema";
import { TYPES } from "../../../infrastructure/containers/types";

@injectable()
export class CreateLogUseCase implements IUseCase<LogDto, LogEntity>{

    constructor(
        @inject(TYPES.LOG_REPOSITORY) private readonly repository: LogRepository
    ) {}

    async execute(data: LogDto): Promise<LogEntity> {
        return await this.repository.createLog(data);
    }

}