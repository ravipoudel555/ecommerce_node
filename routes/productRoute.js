const express = require("express");
const productService = require("../services/productService");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();
const path = require("path");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

router.get("/", productService.getAllProducts);
router.get("/:id", productService.getProduct);
router.post("/add-product", upload.single("image"), productService.addProduct);

module.exports = router;
