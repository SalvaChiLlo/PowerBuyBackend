'use strict';

const { Router } = require('express');
const apicache = require('apicache')

let cache = apicache.options({
  respectCacheControl: true,
  debug: true
}).middleware;

const Producto = require('./producto.controller');

const router = new Router();

router.get('/', Producto.index, cache('5 minutes'));
router.post('/', Producto.create);
router.get('/:id', Producto.show);
router.delete('/:id', Producto.destroy);

module.exports = router;
