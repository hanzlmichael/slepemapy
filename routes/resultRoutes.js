const { Router } = require('express');
const resultController = require('../controllers/resultController');
const { requireAuth, checkAuthor } = require('../middleware/authMiddleware');

const router = Router();

//router.get('/',  (req, res) => res.render('result'));
router.post('/:testId', resultController.postResult);
router.get('/:resultId', resultController.getResultById);
//router.get('/:testId/exam', testController.getExam);

module.exports = router;