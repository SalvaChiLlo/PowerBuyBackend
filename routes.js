// // import Endpoints
const user = require('./api/user');

module.exports = (app) => {
  app.use('/api/users', user);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });
};
