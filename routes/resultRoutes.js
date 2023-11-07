const { Router } = require('express');
const resultController = require('../controllers/resultController');
const { requireAuth, checkAuthor, checkUser, isAuthor } = require('../middleware/authMiddleware');

const router = Router();

//router.get('/',  (req, res) => res.render('result'));
router.post('/:testId', resultController.postResult);
router.get('/:resultId', isAuthor, resultController.getResultById);
router.delete('/:resultId', resultController.deleteResultById);
router.put('/:resultId', resultController.updateResultById);
//router.get('/:testId/exam', testController.getExam);

module.exports = router;