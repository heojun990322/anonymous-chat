const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchChats,
  createChat,
  enterChat,
  leaveChat,
  findChat,
} = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, findChat);
router.route("/fetch").get(protect, fetchChats);
router.route("/create").post(protect, createChat);
router.route("/enter").put(protect, enterChat);
router.route("/leave").put(protect, leaveChat);

module.exports = router;
