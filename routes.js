// // import Endpoints
const user = require('./api/user');
const caracteristica = require('./api/caracteristica');
const categoriaProducto = require('./api/categoriaProducto');
const cliente = require('./api/cliente');
const imagen = require('./api/imagen');
const loteProducto = require('./api/loteProducto');
const opinion = require('./api/opinion');
const pago = require('./api/pago');
const producto = require('./api/producto');

module.exports = (app) => {
  app.use('/api/users', user);
  app.use('/api/caracteristica', caracteristica);
  app.use('/api/categoriaProducto', categoriaProducto);
  app.use('/api/cliente', cliente);
  app.use('/api/imagen', imagen);
  app.use('/api/loteProducto', loteProducto);
  app.use('/api/opinion', opinion);
  app.use('/api/pago', pago);
  app.use('/api/producto', producto);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });
};
