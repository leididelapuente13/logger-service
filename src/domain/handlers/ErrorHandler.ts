import { Response } from "express";
import { CustomError } from "../errors/Error";

export const handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        res.status(error.status).json({ message: error.message, status: error.status });
    } else {
        res.status(500).json({ message: 'Internal Server Error', status: 500 });
    }
}