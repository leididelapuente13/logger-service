import { Response } from "express";

interface ResponsePayload<T> {
    success: boolean,
    message: string,
    data?: T
}

export const ResponseHandler = <T>(res: Response, success: boolean, message: string, data?: T): Response=>{

    const response: ResponsePayload<T>={
        success,
        message,
        data
    }

    if(success){
        return res.status(200).json(response)
    }
}