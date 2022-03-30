const { Router } = require('express');

const { index } = require('./helloWorld.controller');

const router = Router();

router.get('/', index);

module.exports = router;