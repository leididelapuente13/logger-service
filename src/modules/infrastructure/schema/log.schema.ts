import z from 'zod';
import { CONSTANTS } from '../../../infrastructure/constants/constants';

const logtype = z.nativeEnum(CONSTANTS.LogTypes, {invalid_type_error: 'Invalid log type', required_error: 'Type is required'});

const contentSchema = z.object({
    statusCode: z.number(),
    statusMessage: z.string().optional(),
    headers: z.any(),
    url: z.string(),
    method: z.string(),
    ip: z.string()
});

export const LogSchema = z.object({
    service: z.string({ required_error: 'Service is required' }),
    payload: z.any().optional(),
    type: logtype,
    content: contentSchema.optional(),
});

export type LogDto = z.infer<typeof LogSchema>;

export const validateLog = (log: unknown) => {
    return LogSchema.safeParse(log);
}

export const validateLogType = (type: unknown) => {
    return logtype.safeParse(type);
}