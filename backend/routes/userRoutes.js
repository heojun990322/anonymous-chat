const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  deleteUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers); // 등록, 검색
router.post("/login", authUser); // 인증
router.route("/delete").put(protect, deleteUser); // 삭제

module.exports = router;
