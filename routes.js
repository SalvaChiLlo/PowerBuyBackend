// // import Endpoints
const producto = require('./api/producto');

module.exports = (app) => {
  app.use('/api/productos', producto);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });
};
