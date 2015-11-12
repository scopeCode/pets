var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('cookie-session');
var routes        = require('./routes');
var compression   = require('compression');

//需要优化的地方
var logger    = require("pet/log/index");
global.logger = logger.logger("pets");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(compression());//开启压缩模式
app.use(express.static(path.join(__dirname, 'public')));

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//暂时用这种方法,之后要替换成  mongo 或 redis
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*10
  }
}));

routes(app);
module.exports = app;