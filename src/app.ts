import express from 'express';
import routes from './routes/api.routes.js';
import globalErrorhandler from './shared/middleware/globalErrorhandler.js';
import { notFoundHandler } from './shared/middleware/notFoundHandler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Security
// app.use(helmet());
// app.use(cors());

// Routes
app.use('/api/v1', routes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(globalErrorhandler);

export default app;
