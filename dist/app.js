"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const connect_1 = __importDefault(require("./db/connect"));
const cors_1 = __importDefault(require("cors"));
const error_service_1 = __importDefault(require("./error/error.service"));
const error_1 = require("./error/error");
const jumia_1 = __importDefault(require("./routes/jumia"));
const cronjob_1 = require("./utils/cronjob");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(() => (0, cronjob_1.executeCronJob)())();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ limit: "5mb", extended: true }));
//
app.use("/api/v1/products/jumia", jumia_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use((req, res, next) => {
    let err = new error_1.AppError(`${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`, 404);
    next(err);
});
// Centralized error handling middleware
app.use((err, req, res, next) => {
    (0, error_service_1.default)(err, req, res, next);
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DB = process.env.DATABASE_URL;
        yield (0, connect_1.default)(DB !== null && DB !== void 0 ? DB : "");
        app.listen(port, () => {
            console.log(`REST API on http://localhost:${port}`);
        });
    }
    catch (e) {
        console.error("here is the error: ", e);
    }
});
exports.start = start;
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
