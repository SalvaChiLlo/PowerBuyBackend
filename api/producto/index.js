'use strict';

const { Router } = require('express');
const apicache = require('apicache')

let cache = apicache.options({
  respectCacheControl: false,
  debug: true
}).middleware;

const Producto = require('./producto.controller');

const router = new Router();

router.get('/', cache('5 minutes'), Producto.index);
router.post('/', Producto.create);
router.get('/:id', Producto.show);
router.delete('/:id', Producto.destroy);

module.exports = router;
