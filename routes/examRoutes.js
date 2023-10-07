const { Router } = require('express');
const examController = require('../controllers/examController');
const router = Router();

router.get('/:testId/exam', (req, res) => res.render('exam'));

module.exports = router;