import { Request } from 'express';

interface IRequestBody {
    service: string,
    type: string,
    payload?: any
}

declare module 'express-serve-static-core' {
    interface Request {
        body?: IRequestBody
    }
}
