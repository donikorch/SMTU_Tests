require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Group, Admin } = require("../../db/models");

router.get("/groups", async (req, res) => {
  try {
    const groups = await Group.findAll({
      where: { adminId: res.locals.user.id },
    });
    res.status(200).json(groups);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Admin.findAll({
      where: { role: "admin" },
    });
    res.status(200).json(teachers);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.get("/:number/students", async (req, res) => {
  const { number } = req.params;
  try {
    const group = await Group.findOne({ where: { number } });

    const students = await User.findAll({
      where: { groupId: group.id },
    });

    res.status(200).json(students);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post("/addGroup", async (req, res) => {
  const { group } = req.body;
  try {
    const groups = await Group.create({
      number: group,
      adminId: res.locals.user.id,
    });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete("/:role/:id", async (req, res) => {
  const { role, id } = req.params;
  try {
    if (role === "admin") {
      const result = await Admin.destroy({ where: { id } });
    }
    if (role === "student") {
      const result = await User.destroy({ where: { id } });
    }
    res.status(200).end();
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put("/", async (req, res) => {
  const { id, login, password, firstName, lastName, middleName, role } =
    req.body;
  let hash;
  if (password !== "*******") {
    hash = await bcrypt.hash(password, 10);
  }
  const user = {
    id,
    login,
    password: hash || password,
    firstName,
    lastName,
    middleName,
    role,
  };
  try {
    let result;
    if (role === "admin") {
      result = await Admin.update(user, { where: { id } });
    }
    if (role === "student") {
      result = await User.update(user, { where: { id } });
    }
    res.status(200).end(result[0]);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
