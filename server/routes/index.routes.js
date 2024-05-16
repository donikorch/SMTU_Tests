const router = require('express').Router();

const authApiRouter = require('./api/auth.router');
const testsApiRouter = require('./api/tests.router');

router.use('/api/auth', authApiRouter);
router.use('/api/tests', testsApiRouter);

module.exports = router;
