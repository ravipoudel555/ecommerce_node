const express = require("express");
const userService = require("../services/userService");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();
router.get("/secret", checkAuth, (req, res) => {
  res.status(200).json({ msg: "This is super secret content" });
});

router.post("/signup", userService.signup);
router.post("/login", userService.login);
module.exports = router;
