var express = require("express");
var session = require("express-session");
var path = require("path");

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var models = require("./models/models");

var auth = require("./routes/auth");
var MongoStore = require("connect-mongo")(session);
var mongoose = require("mongoose");
var _ = require("lodash");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SECRET,
    name: "CookieMon",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);
// Initialize Passport
/* app.use(passport.initialize());
app.use(passport.session()); */

/* passport.serializeUser(function(user, done) {
  done(null, user._id);
}); */
// Passport Deserialize
/* passport.deserializeUser(function(id, done) {
  models.Vid.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(function(email, password, done) {
    models.User.findOne({ email: email }, function(err, user) {
      if (err) {
        console.log(err);
        done(err);
      } else if (!user) {
        done(null, false, { message: "incorrect email" });
      } else if (user.password !== password) {
        done(null, false, { message: "incorrect password" });
      } else {
        done(null, user);
      }
    });
  })
); */

app.use("/", indexRouter);
app.use("/users", usersRouter);
/* app.use("/admin", auth(passport)); */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
