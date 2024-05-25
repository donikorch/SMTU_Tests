const router = require('express').Router();
const authApiRouter = require('./api/auth.router');
const testsApiRouter = require('./api/tests.router');
const teacherApiRouter = require('./api/teacher.router');

router.use('/api/auth', authApiRouter); // аутентификация
router.use('/api/tests', testsApiRouter); // взаимодействие с тестами
router.use('/api/teacher', teacherApiRouter); // взаимодействие с учителями/учениками и группами

module.exports = router;
