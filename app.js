var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var logger = require('morgan');
const cookieSession = require('cookie-session')
const session = require("express-session")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const routes = require('./routes')
const cors = require('cors')
require('dotenv').config()
var app = express();

const User = require('./models/User')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

app.use(cookieSession({
  name: 'session',
  keys: [
    'd60e308455a642c59a5b8aba848e1dc4',
    'db748087f753339a8ca0a9d61609c677',
  ],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}))

app.use('/api', routes);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const match = bcrypt.compare(password, user.password)
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      const token = user.generateAuthToken()
      return done(null, user);
    });
  }
));

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
