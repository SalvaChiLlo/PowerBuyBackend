const config = require('./config/environment');
const express = require('express');
const expressConfig = require('./config/express');
const http = require('http');
const routeConfig = require('./routes');
const sqldb = require('./sqldb');


// Setup server
const app = express();
const server = http.createServer(app);

expressConfig(app);
routeConfig(app);

function startServer() {
  server.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://${config.ip}:${process.env.PORT}, in ${app.get('env')} mode`);
  });
}

sqldb.sequelize.sync({ alter: true })
  .then(startServer)
  .catch((err) => {
    console.error(`Server failed to start due to error: ${err}`);
  });

module.exports = app;