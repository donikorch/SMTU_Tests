require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');

// модели
const { User, Group, Admin, Result } = require('../../db/models');

// получение всех групп
router.get('/groups', async (req, res) => {
  try {
    const groups = await Group.findAll({
      where: { adminId: res.locals.user.id },
    });
    res.status(200).json(groups);
  } catch ({ message }) {
    res.json({ message });
  }
});

// получение всех преподов
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Admin.findAll({
      where: { role: 'admin' },
    });
    res.status(200).json(teachers);
  } catch ({ message }) {
    res.json({ message });
  }
});

// получение студентов в группе
router.get('/:number/students', async (req, res) => {
  const { number } = req.params;
  try {
    const group = await Group.findOne({ where: { number } });

    const students = await User.findAll({
      where: { groupId: group.id },
      include: [
        {
          model: Result,
        },
      ],
    });

    res.status(200).json(students);
  } catch ({ message }) {
    res.json({ message });
  }
});

// добавление группы
router.post('/addGroup', async (req, res) => {
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

// удаление студента или препода
router.delete('/:role/:id', async (req, res) => {
  const { role, id } = req.params;
  try {
    if (role === 'admin') {
      const result = await Admin.destroy({ where: { id } });
    }
    if (role === 'student') {
      const result = await User.destroy({ where: { id } });
    }
    res.status(200).end();
  } catch ({ message }) {
    res.json({ message });
  }
});

// обновление студента или препода
router.put('/', async (req, res) => {
  const { id, login, password, name, firstName, lastName, middleName, role } =
    req.body;
  let hash;
  if (password !== '*******') {
    hash = await bcrypt.hash(password, 10);
  }
  const user = {
    id,
    login,
    password: hash || password,
    name: name || null,
    firstName: firstName || null,
    lastName: lastName || null,
    middleName: middleName || null,
    role,
  };
  try {
    let result;
    if (role === 'admin') {
      result = await Admin.update(user, { where: { id } });
    }
    if (role === 'student') {
      result = await User.update(user, { where: { id } });
    }
    res.status(200).end(result[0]);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
