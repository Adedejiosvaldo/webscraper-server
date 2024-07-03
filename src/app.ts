import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToDb from "./db/connect";
import cors from "cors";
import errorHandler from "./error/error.service";
import { AppError } from "./error/error";
import router from "./routes/jumia";
import { executeCronJob } from "./utils/cronjob";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

(() => {
  console.log("Attempting to execute cron job...");
  try {
    executeCronJob();
    console.log("Cron job executed successfully.");
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
})();
// (() => executeCronJob())();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

//

app.use("/api/v1/products/jumia", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  let err = new AppError(
    `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`,
    404
  );
  next(err);
});

// Centralized error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

export const start = async () => {
  try {
    const DB = process.env.DATABASE_URL;
    await connectToDb(DB ?? "");
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error("here is the error: ", e);
  }
};

// require("express-async-errors");
// import express, { Express } from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import cors from "cors";
// import { NextFunction } from "express";

// const jumiaRoute = require("./routes/jumia");
// const app: Express = express();

// app.use(cors());

// app.use("/api/v1/products/jumia", jumiaRoute);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   let err = new AppError(
//     `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`,
//     404
//   );
//   next(err);
// });

// app.get("/", (req, res) => {
//   res.json({ msg: "success", location: "Homepage" });
// });

// module.exports = app;

// src/index.js
