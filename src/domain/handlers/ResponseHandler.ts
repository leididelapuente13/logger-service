import { Response } from "express";

interface ResponsePayload{
    status: number,
    message: string,
    data?: any
}

export const handleResponse = (res: Response, payload: ResponsePayload) => {
    const {status, message, data} = payload;
    res.status(status).json({ message, data });
}