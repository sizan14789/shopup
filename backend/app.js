import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { globalErrorHandler, notFound } from "./middlewares/Error.js";
import loginRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import ordersRouter from "./routes/orders.js";
import wishlistRouter from "./routes/wishlist.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", loginRouter);
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/api", ordersRouter);
app.use("/api", wishlistRouter);

// ping route for auto-bot
app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// Not found
app.use(notFound);

// Error handling Middleware
app.use(globalErrorHandler);

export default app;
