const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");

dotenv.config();

const app = express();

// JSON 데이터를 받기 위함
app.use(express.json());

// access-control-allow-origin header settings
app.use(
  cors({
    origin: process.env.PROXY_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("Socket server is running successfully!");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.PROXY_URL,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io".blue);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    userData.isAnonymous
      ? console.log(
          `anonymous user: ${userData._id}, ${userData.userName}`.white
        )
      : console.log(
          `loggin in user: ${userData._id}, ${userData.userName}`.white
        );

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User Joined Room: ${room}`.white);
  });

  socket.on("chat list update", (chat) => {
    if (!chat.users) return console.log("chat.users not defined".red);

    var users = chat.users;

    chat.users.forEach((user) => {
      if (user._id == users[users.length - 1]) return;

      socket.in(user._id).emit("fetch chats");
    });
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined".red);

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
      if (!user.isAnonymous) socket.in(user._id).emit("fetch chats");
    });
  });
});
