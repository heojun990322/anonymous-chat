const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();
const app = express();

// JSON 데이터를 받기 위함
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// error 처리
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}`.yellow.bold));
