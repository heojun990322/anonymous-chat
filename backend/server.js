const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();
const app = express();

// JSON 데이터를 받기 위함
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}`.yellow.bold));
