const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    id: { type: String, index: true, unique: true, sparse: true },
    userName: { type: String, required: true, default: "user" },
    password: { type: String },
    isAnonymous: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// 입력한 password와 데이터베이스의 password 비교
userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 저장되기 전에 password 암호화
userModel.pre("save", async function (next) {
  if (this.isAnonymous) next();
  if (!this.isModified) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
