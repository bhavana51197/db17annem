var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var elephant = require("./models/elephant");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var elephantRouter = require('./routes/elephant');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await elephant.deleteMany();
  let instance1 = new elephant({
    Name: "Sam",
    Cost: "2200",
    Weight: "240"
  });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
  let instance2 = new elephant({
    Name: "Pam",
    Cost: "2900",
    Weight: "290"
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
  });
  let instance3 = new elephant({
    Name: "Dan",
    Cost: "9200",
    Weight: "100"
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
  });
}
let reseed = false;
recreateDB();
if (reseed == true) {
  recreateDB();
 
}
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      Account.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      });
  }));
  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport config
// Use the existing connection
// The Account model
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true, useUnifiedTopology: true
  });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/elephant', elephantRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

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

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
})