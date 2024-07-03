"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jumia_1 = require("../controllers/jumia");
const router = express_1.default.Router();
router.route("/jumia").get(jumia_1.getAllProducts);
exports.default = router;
// Compare this snippet from src/controllers/jumia.ts:
