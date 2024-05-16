const router = require('express').Router();

const { Result } = require('../../db/models');

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

router.post('/saveResults', async (req, res) => {
  try {
    const { module, type, passed, score, userId } = req.body;

    const result = await Result.create({ module, type, passed, score, userId });

    res.json({ message: 'success' });
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
