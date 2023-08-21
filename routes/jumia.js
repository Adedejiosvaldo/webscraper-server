const express = require("express");
const { getAllProducts } = require("../controllers/jumia");
const router = express.Router();

router.route("/jumia").get(getAllProducts);

module.exports = router;
