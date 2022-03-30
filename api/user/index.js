const { Router } = require('express');
const {
    handlerAllUsers,
    handlerUserById,
    handlerCreateUser,
    handlerDeleteUser,
    handlerUpdateUser,
} = require('./user.controller');

const router = Router();

router.post('/', handlerCreateUser);
router.get('/', handlerAllUsers);
router.get('/:id', handlerUserById);
router.patch('/:id', handlerUpdateUser);
router.delete('/:id', handlerDeleteUser);

module.exports = router;
