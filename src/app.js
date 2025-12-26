import cors from "cors";
import express from "express";
import { globalErrorHandler, notFoundHandler } from "express-error-toolkit";
import actionRouter from "./app/routes/action.routes.js";

const app = express();

// cors and body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use action router
app.use("/api", actionRouter);

// home route
app.get("/", (req, res) => {
   res.status(200).json({
      success: true,
      message: "Server is running",
   });
});

// not found handler and global error handler
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
