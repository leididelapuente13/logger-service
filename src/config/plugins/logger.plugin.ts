import winston from 'winston';
import 'winston-mongodb';
import { envs } from './env.plugin';

const logCustomLevels = {
    levels: {
        error: 0,
        post: 1,
        get: 2,
        put: 3,
        patch: 4,
        delete: 5,
        trace: 6,
    }
}

const { MONGO_DB_URL} = envs;

export const logger = winston.createLogger({
    levels: logCustomLevels.levels,
    transports: [
        new winston.transports.MongoDB({
            level: 'error',
            db: MONGO_DB_URL,
            collection: 'logs',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ],
    format: winston.format.json(),
});

