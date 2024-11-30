class ApiError extends Error {
    statusCode: number;
    message: string;
    stack?: any;

    constructor(statusCode: number = 500, message: string, stack: any = '') {
        super(message)

        this.statusCode = statusCode;
        this.message = message;
        if (stack) {
            this.stack = stack;
          } else {
            Error.captureStackTrace(this, this.constructor);
          }
    }
}

export default ApiError