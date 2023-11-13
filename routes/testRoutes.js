const { Router } = require('express');
const testController = require('../controllers/testController');
/* const resultController = require('../controllers/resultController'); */
const { requireAuth, checkAuthor, checkAdmin, isAdmin } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, checkAdmin, testController.getTests);
router.get('/all', requireAuth, isAdmin, testController.getAllTests);
router.get('/new', requireAuth, testController.getNewTest);
router.get('/count', requireAuth, checkAdmin, testController.getTestsCount);
router.put('/:testId/publish', requireAuth, testController.publishTest);
router.post('/new', requireAuth, testController.postTest);
router.get('/:testId/edit', checkAuthor, testController.getTestById);
router.get('/:testId', testController.getTestByIdTest);
router.delete('/:testId', requireAuth, testController.deleteTest);
router.put('/:testId', requireAuth, checkAuthor, testController.updateTestById);
router.get('/:testId/exam', testController.getExam);
router.get('/:testId/results', requireAuth, checkAuthor, testController.getResults);

module.exports = router;