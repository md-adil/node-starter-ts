"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.AppError = AppError;
class ResponseError extends AppError {
    constructor(message, statusCode = 500) {
        super(message, 'RESPONSE_ERROR');
        this.statusCode = statusCode;
    }
    handle(req, res) {
        if (req.headers.accept === "application/json") {
            return res.status(this.statusCode).send({ message: this.message });
        }
        return res.status(this.statusCode).send(this.message);
    }
}
exports.ResponseError = ResponseError;
class ValidationError extends ResponseError {
    constructor(message) {
        super(message, 422);
        this.code = 'VALIDATION_ERROR';
    }
}
exports.ValidationError = ValidationError;
class AuthError extends ResponseError {
    constructor(message) {
        super(message, 401);
    }
}
exports.AuthError = AuthError;
