import express from "express";
import { getAllProducts } from "../controllers/jumia";
const router = express.Router();

router.route("/jumia").get(getAllProducts);

export default router;
// Compare this snippet from src/controllers/jumia.ts:
