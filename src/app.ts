import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Config } from '@/config';
import { Routes } from '@/interfaces/app';
import { logger, loggerHttp } from './utils/logger';
import { errorConverter, errorHandler } from './middlewares/errorHandler';
import ApiError from './utils/apiError';
import httpStatus from 'http-status';

class App {
    public app: Express;
    public env: string;
    public port: string | number;

    constructor(config: Config) {
        this.app = express();
        this.env = config.NODE_ENV;
        this.port = config.PORT;

        this.initMiddlewares();
    }

    public listen() {
        const server = this.app.listen(this.port, () => {
            logger.info(`[server]: Server is running on port ${this.port}`);
        });

        return server;
    }

    public getServer(): Express {
        return this.app;
    }

    public initRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/api/v1/', route.router);
        });

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next(new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]));
        });
        
        this.app.use(errorConverter)
        this.app.use(errorHandler)
    }

    public initMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(loggerHttp)
    }
}

export default App;
