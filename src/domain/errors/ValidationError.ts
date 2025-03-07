import { ZodError } from "zod";
import { CustomError } from "./Error";

export class ValidationError extends CustomError {
    constructor(zodError: ZodError) {
      super(zodError.message, 400);
    }
  }