import { RequestHandler } from 'express';
import schemas from '@/schemas';

interface ValidationError {
    message: string;
    type: string;
}

interface JoiError {
    status: string;
    error: {
        original: unknown;
        details: ValidationError[];
    };
}

interface CustomError {
    status: string;
    error: string;
}

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete'];

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const schemaValidator = (path: string, useJoiError = true): RequestHandler => {
    const schema = schemas[path];

    if (!schema) {
        throw new Error(`Schema not found for path: ${path}`);
    }

    return (req, res, next) => {
        let resValidate
        const method = req.method.toLowerCase();
        
        if (!supportedMethods.includes(method)) {
            return next();
        }

        if (method == 'get') {
            resValidate = schema.validate(req.query, validationOptions);
        } else {
            resValidate = schema.validate(req.body, validationOptions);
        }

        if (resValidate.error) {
            const customError: CustomError = {
                status: 'failed',
                error: 'Invalid request. Please review request and try again.',
            };

            const joiError: JoiError = {
                status: 'failed',
                error: {
                    original: resValidate.error._original,
                    details: resValidate.error.details.map(({ message, type }: ValidationError) => ({
                        message: message.replace(/['"]/g, ''),
                        type,
                    })),
                },
            };

            return res.status(422).json(useJoiError ? joiError : customError);
        }

        // validation successful
        req.body = resValidate.value;
        return next();
    };
};

export default schemaValidator;
