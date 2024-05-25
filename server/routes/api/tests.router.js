const router = require('express').Router();

// модели
const { Result } = require('../../db/models');

// получение результатов
router.get('/getResults', async (req, res) => {
  try {
    const results = await Result.findAll({
      where: { userId: res.locals.user.id },
    });

    res.json({ message: 'success', results });
  } catch ({ message }) {
    res.json({ message });
  }
});

// сохранение результатов
router.post('/saveResults', async (req, res) => {
  try {
    const { module, type, passed, score, userId } = req.body;

    const result = await Result.create({ module, type, passed, score, userId });

    res.json({ message: 'success' });
  } catch ({ message }) {
    res.json({ message });
  }
});

// удаление результатов
router.delete('/:id', async (req, res) => {
  console.log(req.params);
  try {
    const result = await Result.destroy({ where: { id: req.params.id } });
    res.status(200).json(result);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
