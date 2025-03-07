import { ZodError } from "zod";
import { CustomError } from "./Error";

export class ValidationError extends CustomError {
    constructor(error: ZodError) {
      super(error.message, 400);
    }
  }