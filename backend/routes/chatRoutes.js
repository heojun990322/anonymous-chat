const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchChats,
  createChat,
  addToChat,
  leaveChat,
  findChat,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").get(protect, findChat);
router.route("/fetch").get(protect, fetchChats);
router.route("/create").post(protect, createChat);
router.route("/add").put(protect, addToChat);
router.route("/leave").put(protect, leaveChat);

module.exports = router;
