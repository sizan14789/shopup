import cookieParser from "cookie-parser";
import express from "express";
import { globalErrorHandler, notFound } from "./middlewares/Error.js";
import loginRouter from './routes/auth.js'

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser())

// routes
app.use(loginRouter);

// Not found
app.use(notFound)

// Error handling Middleware
app.use(globalErrorHandler)

export default app;