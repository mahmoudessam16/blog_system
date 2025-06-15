import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import postsRouter from "./routes/posts.routes.js";
import loggingMiddleware from "./middlewares/loggerMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://blog-system-front2.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postsRouter);

connectDB().catch((err) => {
  console.error("DB connection failed:", err);
});

export default app;
