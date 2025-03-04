import z from 'zod';
import { LogType } from '../entities/log.entity';

const logtype = z.nativeEnum(LogType, {invalid_type_error: 'Invalid log type', required_error: 'Type is required'});

const LogSchema = z.object({
    service: z.string().min(1, {message: 'Service is required'}),
    payload: z.string().optional(),
    type: logtype,
    content: z.string().optional(),
});

export type LogDto = z.infer<typeof LogSchema>;

export const validateLog = (log: unknown) => {
    return LogSchema.safeParse(log);
}

export const validateLogType = (type: unknown) => {
    return logtype.safeParse(type);
}