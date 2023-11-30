const { Router } = require('express');
const resultController = require('../controllers/resultController');
const { isAuthor } = require('../middleware/authMiddleware');

const router = Router();

router.post('/:testId', resultController.postResult);
router.get('/:resultId', isAuthor, resultController.getResult);
router.delete('/:resultId', resultController.deleteResult);
router.put('/:resultId', resultController.updateResult);

module.exports = router;