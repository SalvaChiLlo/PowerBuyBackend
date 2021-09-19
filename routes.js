// // import Endpoints
const user = require('./api/user');
// const post = require('./api/post');
// const prouser = require('./api/prouser');

module.exports = (app) => {
  app.use('/api/users', user);
  // app.use('/api/posts', post);
  // app.use('/api/prouser', prouser);

  app.get('/', (req, res) => {
    res.status(200).send('<h1>Server is running</h1>');
  });
};
