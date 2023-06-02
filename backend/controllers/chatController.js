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
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a chat");
  }

  users.push(req.user);

  try {
    const chat = await Chat.create({
      name: req.body.name,
      users: users,
    });

    const fullChat = await Chat.findOne({ _id: chat._id })
      .populate("users", "-password")

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
  )
    .populate("users", "-password")

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});

const leaveChat = expressAsyncHandler(async (req, res) => {
  const { chatId } = req.body;
  const chat = await Chat.findById(chatId);

  const leave = (chat?.users.length > 1) ? (await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")) 
    :
    (await Chat.findByIdAndDelete(chatId));

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
