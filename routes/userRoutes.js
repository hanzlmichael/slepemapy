const { Router } = require('express');
const userController = require('../controllers/userController');
/* const resultController = require('../controllers/resultController'); */
const { requireAuth, checkAuthor, isAdmin } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, isAdmin, userController.getUsers);
router.get('/all', requireAuth, isAdmin, userController.getAllUsers);
router.get('/count', requireAuth, isAdmin, userController.getUsersCount);
router.delete('/:userId', requireAuth, isAdmin, userController.deleteUser);
router.post('/email', requireAuth, isAdmin, userController.getUserByEmail)

module.exports = router;