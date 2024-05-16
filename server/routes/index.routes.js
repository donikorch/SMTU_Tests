const router = require('express').Router();

const authApiRouter = require('./api/auth.router');
const testsApiRouter = require('./api/tests.router');
const teacherApiRouter = require('./api/teacher.router')
router.use('/api/auth', authApiRouter);
router.use('/api/tests', testsApiRouter);
router.use('/api/teacher', teacherApiRouter)

module.exports = router;
