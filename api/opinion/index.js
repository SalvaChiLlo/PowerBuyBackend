'use strict';

const { Router } = require('express');

const Opinion = require('./opinion.controller');

const router = new Router();

// router.get('/', Opinion.index);
router.post('/', Opinion.create);
// router.get('/:id', Opinion.show);
// router.delete('/:id', Opinion.destroy);

module.exports = router;
