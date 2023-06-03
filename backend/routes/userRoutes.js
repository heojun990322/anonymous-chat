const express = require("express");
const {
  registerUser,
  registerAnony,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers); // 등록, 검색
router.route("/anony").post(registerAnony) // 익명 유저 등록
router.post("/login", authUser); // 인증

module.exports = router;
