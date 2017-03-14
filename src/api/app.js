//http://thbastos.com/blog/criando-uma-aplicacao-em-nodejs-3-criando-nossa-api-node
//autenticação https://code.tutsplus.com/pt/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var mysql = require('mysql');
var connection = require('express-myconnection');

// Requisição ao arquivo que cria nosso model Contato
//require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// // connection with data base
app.use(
  connection(mysql, {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'praqueacucar'
  }, 'request')
);

// //connection with data base
// app.use(
//   connection(mysql, {
//     host: 'mysql4.gear.host',
//     user: 'praqueacucar',
//     password: 'Uu2N9_YX-4ax',
//     port: '3306',
//     database: 'praqueacucar'
//   }, 'request')
// );

app.use('/', index);
app.use('/', users);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// LISTEN (iniciando nossa aplicação em node) ==========
// Define a porta 8080 onde será executada nossa aplicação
app.listen(process.env.PORT || 8080);
// Imprime uma mensagem no console
console.log("Aplicação executada na porta 8080");

module.exports = app;
