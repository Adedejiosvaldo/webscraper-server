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
exports.createDataIntoModel = exports.getAllProducts = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const Jumia_1 = __importDefault(require("../model/Jumia"));
const createDataIntoModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto("https://www.jumia.com.ng");
        const categories = yield page.$$eval(".col16.-pvs .card.-oh._fw.-rad4  .crs-w._main.-phxs .crs.row._no-g.-fw-nw._6cl-4cm.-pvxs .itm.col", (elements) => elements.map((e) => {
            const titleElement = e.querySelector(".prd._box._hvr .name");
            const stkElement = e.querySelector(".stk");
            const bdgElement = e.querySelector(".bdg._dsct");
            const coreElement = e.querySelector(".prd._box._hvr .core");
            const imgElement = e.querySelector(".img");
            const prcElement = e.querySelector(".prc");
            const priceString = prcElement ? prcElement.innerText : "N/A";
            const price = new Intl.NumberFormat().format(parseInt(priceString.replace(/[^0-9.]/g, "")));
            // Format price into a readable form
            const parsedPrice = parseInt(price.replace(/[^\d.-]/g, ""));
            const formattedPrice = isNaN(parsedPrice) ? "N/A" : parsedPrice;
            return {
                title: titleElement ? titleElement.innerText : "N/A",
                itemsLeft: stkElement ? stkElement.innerText : "N/A",
                discountPrice: bdgElement ? bdgElement.innerText : "N/A",
                URL: coreElement ? coreElement.href : "N/A",
                imageURL: imgElement ? imgElement.getAttribute("data-src") : "N/A",
                price: formattedPrice,
            };
        }));
        // Remove non-numeric characters (excluding the currency symbol)
        yield browser.close();
        return categories;
    }
    catch (error) {
        console.error("Error during scraping:", error);
    }
});
exports.createDataIntoModel = createDataIntoModel;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 items
    const skip = (page - 1) * limit;
    try {
        const allData = yield Jumia_1.default.find().skip(skip).limit(limit);
        const total = yield Jumia_1.default.countDocuments(); // Get total documents for pagination info
        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            limit,
            data: allData,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error });
    }
});
exports.getAllProducts = getAllProducts;
// module.exports = { getAllProducts, createDataIntoModel };
