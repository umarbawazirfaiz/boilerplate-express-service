import { getConfig } from './config';
import App from './app';
import AppRoutes from './routes/app';
import { logger } from './utils/logger';

const config = getConfig();
const app = new App(config);

const appRoutes = new AppRoutes()

app.initRoutes([appRoutes]);

const server = app.listen();

process.on('uncaughtException', (err) => {
    logger.fatal(err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.fatal(err);
    server.close(() => process.exit(1));
});
