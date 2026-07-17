import type { Server } from 'node:http';

import app from './app.js';
import config from './config/config.js';

let server: Server;

/**
 * Bootstrap the application.
 *
 * Future Responsibilities:
 * - Load environment variables
 * - Connect to MongoDB
 * - Connect to Redis
 * - Initialize background jobs
 * - Start HTTP server
 */
const startServer = (): void => {
    try {
        // TODO: Connect Database
        // await connectDatabase();

        server = app.listen(config.PORT, () => {
            console.info('APPLICATION_STARTED', {
                meta: {
                    PORT: config.PORT,
                    SERVER_URL: config.SERVER_URL,
                },
            });
        });
    } catch (error) {
        console.error('APPLICATION_STARTUP_ERROR', {
            meta: error,
        });

        process.exit(1);
    }
};

/**
 * Gracefully shutdown the application.
 */
const shutdown = (signal: string): void => {
    console.info(`${signal}_RECEIVED`);

    if (!server) {
        process.exit(0);
    }

    server.close((error) => {
        if (error) {
            console.error('APPLICATION_SHUTDOWN_ERROR', {
                meta: error,
            });

            process.exit(1);
        }

        console.info('APPLICATION_STOPPED');

        process.exit(0);
    });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();
