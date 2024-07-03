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
exports.executeCronJob = void 0;
const jumia_1 = require("../controllers/jumia");
const Jumia_1 = __importDefault(require("../model/Jumia"));
const node_cron_1 = __importDefault(require("node-cron"));
// Define executeCronJob to manage cron jobs based on some condition
const executeCronJob = () => {
    const RUN_CRON_JOB = true; // This could be dynamically set based on some external configuration
    if (RUN_CRON_JOB) {
        // Schedule the job to run every 5 minutes
        node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log("Running the task at 12-AM.");
                const scrappedData = yield (0, jumia_1.createDataIntoModel)(); // Replace with the actual code to create data in your model
                yield Jumia_1.default.create(scrappedData);
                console.log("Successfully scrapped and uploaded");
            }
            catch (error) {
                console.log(error);
            }
        }));
        node_cron_1.default.schedule("55 23 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("Deleting the existing data at 11:55pm everyday.");
            try {
                yield Jumia_1.default.deleteMany();
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
    else {
        console.log("Cron jobs are disabled.");
    }
};
exports.executeCronJob = executeCronJob;
