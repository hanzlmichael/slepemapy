const { Router } = require('express');
const testController = require('../controllers/testController');
/* const resultController = require('../controllers/resultController'); */
const { requireAuth, checkAuthor } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, testController.getTests);
router.get('/new', requireAuth, testController.getNewTest);
router.put('/:testId/publish', requireAuth, testController.publishTest);
router.post('/new', requireAuth, testController.postTest);
router.get('/:testId/edit', checkAuthor, testController.getTestById);
router.get('/:testId', checkAuthor, testController.getTestByIdTest);
router.delete('/:testId', requireAuth, testController.deleteTest);
router.put('/:testId', requireAuth, checkAuthor, testController.updateTestById);
router.get('/:testId/exam', testController.getExam);
router.get('/:testId/results', testController.getResults);

module.exports = router;