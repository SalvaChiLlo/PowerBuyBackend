// // import Endpoints
const producto = require('./api/producto');
const categoria = require('./api/categoria');

module.exports = (app) => {
  app.use('/api/productos', producto);
  app.use('/api/categorias', categoria);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });
};
