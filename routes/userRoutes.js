const { Router } = require('express');
const userController = require('../controllers/userController');
/* const resultController = require('../controllers/resultController'); */
const { requireAuth, checkAuthor, isAdmin } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, isAdmin, userController.getUsers);
router.delete('/:userId', requireAuth, isAdmin, userController.deleteUser);

module.exports = router;