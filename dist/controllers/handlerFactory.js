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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const APIFeatures = require("../utils/APIFeatures");
const APIErrors = require("../utils/ApiErrors");
const getAll = (Model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .limitFields()
        .pagination()
        .sort();
    const doc = yield features.query;
    if (!doc) {
        return next(new APIErrors("No document found", 400));
    }
    res.status(200).json({
        status: "success",
        count: doc.length,
        data: {
            data: doc,
        },
    });
});
exports.getAll = getAll;
