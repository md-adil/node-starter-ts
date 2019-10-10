import { Request, Response } from "express";
export class AppError extends Error {
    constructor(message: string, public code: string) {
        super(message);
    }
}

export class ResponseError extends AppError {
    constructor(message: string, public statusCode: number = 500) {
        super(message, 'RESPONSE_ERROR');
    }
    handle(req: Request, res: Response) {
        if (req.headers.accept === "application/json") {
            return res.status(this.statusCode).send({ message: this.message });
        }
        return res.status(this.statusCode).send(this.message);
    }
}

export class ValidationError extends ResponseError {
    constructor(message: string) {
        super(message, 422);
        this.code = 'VALIDATION_ERROR';
    }
}


export class AuthError extends ResponseError {
    constructor(message: string) {
        super(message, 401);
    }
}
