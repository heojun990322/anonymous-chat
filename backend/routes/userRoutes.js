const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser); // 등록
router.post("/login", authUser); // 인증

module.exports = router;
