require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Group } = require("../../db/models");
const generateTokens = require("../../utils/authUtils");
const configJWT = require("../../middleware/configJWT");
const { Op } = require("sequelize");

router.post("/sign-in", async (req, res) => {
  let user;
  try {
    const { login, password } = req.body;
    user = await User.findOne({ where: { login } });
    if (!user) {
      res.status(401).json({
        message: "Такого пользователя нет или пароль неверный",
      });
      return;
    }

    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      res.status(401).json({
        message: "Такого пользователя нет или пароль неверный",
      });
      return;
    }
    user = await User.findOne({
      where: { id: user.id },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "middleName",
        "role",
        "groupId",
      ],
    });

    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .status(200)
      .cookie(configJWT.access.type, accessToken, {
        maxAge: configJWT.access.expiresIn,
        httpOnly: true,
      })
      .cookie(configJWT.refresh.type, refreshToken, {
        maxAge: configJWT.refresh.expiresIn,
        httpOnly: true,
      })
      .json({ message: "success", user });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post("/addUser", async (req, res) => {
  const { pass, group } = req.body;
  let user;
  try {
    const hash = await bcrypt.hash(req.body.pass, 10);
    user = {
      ...req.body,
      password: hash,
    };

    if (group) {
      const groupP = await Group.findOne({ where: { number: +group } });
      user.groupId = groupP.id;
    }
    delete user.pass;
    delete user.group;

    user = await User.create(user);

    user = await User.findOne({
      where: { id: user.id },
    });
    // const { accessToken, refreshToken } = generateTokens({ user });
    // res
    //   .cookie(configJWT.access.type, accessToken, {
    //     maxAge: configJWT.access.expiresIn,
    //     httpOnly: true,
    //   })
    //   .cookie(configJWT.refresh.type, refreshToken, {
    //     maxAge: configJWT.refresh.expiresIn,
    //     httpOnly: true,
    //   })
    //   .json({ message: "success", user });
    res.status(200).json({ message: "success", user });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/check", async (req, res) => {
  try {
    if (res.locals.user) {
      const user = await User.findOne({
        where: { id: res.locals.user.id },
        attributes: [
          "id",
          "firstName",
          "lastName",
          "middleName",
          "role",
          "groupId",
        ],
      });

      res.json({ message: "success", user });
      return;
    }
    res.json({ message: "Сначала войдите в свой аккаунт" });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie(configJWT.access.type).clearCookie(configJWT.refresh.type);
    res.json({ message: "success" });
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
