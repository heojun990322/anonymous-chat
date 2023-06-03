const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "id",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createChat = expressAsyncHandler(async (req, res) => {
  // 익명 유저 생성
  if (req.user === "anonymous" && req.body.isAnonymous) {
    const user = await User.create({ isAnonymous: true });

    if (user) {
      req.user = user;
    } else {
      res.status(400);
      throw new Error("Failed to create the anonymous User");
    }
  }

  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);
  users.push(req.user);

  try {
    const chat = await Chat.create({
      name: req.body.name,
      users: users,
    });

    const fullChat = await Chat.findOne({ _id: chat._id }).populate(
      "users",
      "-password"
    );

    res.status(200).json(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const addToChat = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

const leaveChat = expressAsyncHandler(async (req, res) => {
  const { chatId, anonyUserId } = req.body;
  const chat = await Chat.findById(chatId);
  const isAnonymous = req.user === "anonymous" && anonyUserId;

  const leave =
    chat?.users.length > 1
      ? await Chat.findByIdAndUpdate(
          chatId,
          {
            $pull: !isAnonymous
              ? { users: req.user._id }
              : { users: anonyUserId },
          },
          {
            new: true,
          }
        ).populate("users", "-password")
      : await Chat.findByIdAndDelete(chatId);

  if (!leave) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(leave);
  }
});

module.exports = {
  fetchChats,
  createChat,
  addToChat,
  leaveChat,
};
