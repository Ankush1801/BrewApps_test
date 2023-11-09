require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const debug = require('debug')('mmnt:server');
const Response = require('./utility/response');
const helmet = require("helmet");
const cors = require('cors');
const cron = require("node-cron");
const v1Routes = require('./v1/routes');
const connection = require("./common/connection");
const userServices = require("./v1/services/user");
let constant = require('./messages/messages');
const app = express();

app.use(express.static(path.join("uploads")));
app.use((req, res, next) => {
  res.append('Access-Control-Expose-Headers', 'x-total, x-total-pages');
  next();
});
app.use(cors());
app.use(logger('dev'));
app.set('trust proxy', 'loopback');
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  if (req.headers && req.headers.lang && req.headers.lang == 'ar') {
    process.lang = constant.MESSAGES.arr;
  } else {
    process.lang = constant.MESSAGES.en;
  }
  next();
});
app.use('/api/v1', v1Routes);

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err);
  const status = err.status || 400;
  if (err.message == "jwt expired" || err.message == "Authentication error") { res.status(401).send({ status: 401, message: err }); }
  if (typeof err == typeof "") { Response.sendFailResponse(req, res, status, err); }
  else if (err.Error) res.status(status).send({ status: status, message: err.Error });
  else if (err.message) res.status(status).send({ status: status, message: err.message });
  else res.status(status).send({ status: status, message: err.message });
});


app.use('/', function (req, res) {
  res.status(400).send({ code: 400, status: "success", message: "Ankush Pending API", data: {} });
});

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

var server = http.createServer(app);
console.log(`Running on HTTP`);

// io.attach(server);

server.listen(port, async () => {
  await connection.mongodb();
 
  console.log(`Node env :${process.env.NODE_ENV}.`);
  console.log(`Running on port: ${port}.`);
  cron.schedule("0 */8 * * *", async () => {
    console.log("every 8 hour cron");
    userServices.getAllAgents();
    userServices.getAllProperties();
  },
    { scheduled: true });

});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
