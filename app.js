var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var addNewCatRouter = require('./routes/add_new_category');
var viewPaaCatRouter = require('./routes/passwordCategory');
var addNewPassRouter = require('./routes/add_new_password');
var viewAllPassRouter = require('./routes/view_all_password');
var editDeletePassDetailsRouter = require('./routes/password_details');
var joinRouter = require('./routes/join')
var usersRouter = require('./routes/users');

//for API
var addPassCatAPI = require('./api/add_pass_category');
var addPassAPI = require('./api/add_new_password');
var addProdAPI = require('./api/product');
var userAPI = require('./api/user')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'T%"uJ6)@KB~[K7PX',//secret key is generated by Secure Password Generator
resave: false,
saveUninitialized: true,}))


//for routes folder
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/add_new_category',addNewCatRouter);
app.use('/passwordCategory',viewPaaCatRouter);
app.use('/add_new_password',addNewPassRouter);
app.use('/view_all_password',viewAllPassRouter);
app.use('/password_details',editDeletePassDetailsRouter);
app.use('/join',joinRouter);
app.use('/users', usersRouter);

//for api folder
app.use('/api',addPassCatAPI);
app.use('/api',addPassAPI);
app.use('/api',addProdAPI);
app.use('/api',userAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    error:err.status
  })
  res.status(500).json({
    error:"Internal Server Error"
  })
});

module.exports = app;
