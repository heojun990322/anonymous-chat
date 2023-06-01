const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// 유저 등록
const registerUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  // id 또는 password를 입력하지 않았을 때
  if (!id || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ id });

  // id가 존재할 때
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 유저 생성
  const user = await User.create({
    id,
    password,
  });

  // 유저 생성 여부에 따라 다르게 응답
  if (user) {
    res.status(201).json({
      _id: user._id,
      id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the User");
  }
});

// 유저 인증
const authUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });

  // 존재하는 id고 password가 일치하면 로그인
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid User ID or Password");
  }
});

// 유저 검색
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        // search 변수의 문자열 패턴과 일치하는 id의 유저 리스트
        $or: [{ id: { $regex: req.query.search } }],
      }
    : {};

  const users =
    req.user === "anonymous"
      ? await User.find(keyword)
      : await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
