if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sessions = require('express-session');
const hbs = require('express-handlebars');
var db = require('./connection');




// try {
  // db.connect();
//   console.log("Database connected to port");
// } catch (err) {
//   console.log("Connection Error" + err);
// }




var indexRouter = require('./routes/index');
var reportsRouter = require('./routes/reports');
var uploadRouter = require('./routes/upload');
var usersRouter = require('./routes/users');
var errorRouter = require('./Errors/error');
var authsRouter = require('./routes/auth-routes');

var app = express();

db.connect();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/', partialsDir: __dirname + '/views/partials/' }))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));



app.use('/', indexRouter);
app.use('/reports', reportsRouter);
app.use('/upload', uploadRouter);
app.use('/users', usersRouter);
app.use('/error', errorRouter);
app.use('/auths', authsRouter);


// mongoose.set('strictQuery', true)
// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(() => {
//     console.log(' Database Connected to Server');
//   })
//     .catch((error) => console.log(`mongoose error --- > ${error} did not connect`));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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



module.exports = app;
