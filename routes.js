// // import Endpoints
const producto = require('./api/producto');
const categoria = require('./api/categoria');
const cliente = require('./api/cliente');
const opinion = require('./api/opinion');

module.exports = (app) => {
  app.use('/api/productos', producto);
  app.use('/api/categorias', categoria);
  app.use('/api/clientes', cliente);
  app.use('/api/reviews', opinion);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });
};
