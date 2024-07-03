"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// const ProductSchema = new Schema<Products>({});
const ProductSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    URL: { type: String, required: true },
    imageURL: { type: String, required: true },
    itemsLeft: { type: String, required: false },
    discountPrice: String,
    price: Number,
});
// jumiaSchema.post(/^find/, function (next) {
//   const newVal = new Intl.NumberFormat().format(this.price);
//   this.price = newVal;
// });
const Jumia = (0, mongoose_1.model)("Jumia", ProductSchema);
exports.default = Jumia;
