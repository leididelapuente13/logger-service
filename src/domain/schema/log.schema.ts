import z from 'zod';
import { Log, LogType } from '../entities/log.entity';

const LogSchema = z.object({
    service: z.string().min(1, {message: 'Service is required'}),
    payload: z.string().optional(),
    type: z.nativeEnum(LogType, {invalid_type_error: 'Invalid log type', required_error: 'Type is required'}),
    content: z.string().optional(),
});

export const validateLog = (log: Log) => {
    return LogSchema.safeParse(log);
}