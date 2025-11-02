import cookieParser from "cookie-parser";
import express from "express";
import { globalErrorHandler, notFound } from "./middlewares/Error.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser())

// routes



// Not found
app.use(notFound)

// Error handling Middleware
app.use(globalErrorHandler)

export default app;