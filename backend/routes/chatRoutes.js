const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchChats,
  createChat,
  renameChat,
  addToChat,
  removeFromChat,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").get(protect, fetchChats);
router.route("/create").post(protect, createChat);
router.route("/rename").put(protect, renameChat);
router.route("/add").put(protect, addToChat);
router.route("/remove").put(protect, removeFromChat);

module.exports = router;
