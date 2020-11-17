var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const members = require("./Members");
const buses = require("./bus");
// const PORT = require("./server");

var monk = require('monk');
var db = monk('localhost:27017/wizzard');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var insertRouter = require('./routes/insert');
var deleteRouter = require('./routes/delete');
var findRouter = require('./routes/find');
var updateRouter = require('./routes/update');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//data base 
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//get single member
app.use("/api/members/:id", (req, res) => {
  res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

//gets all members
app.use("/api/members", (req, res) => {
  res.json(members);
  });


  app.use("/api/bus/:id", (req, res) => {
    res.json(buses.filter(bus => bus.bus_no === req.params.id));
  });


  app.use("/api/bus", (req, res) => {
    res.json(buses);
    });


app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.use('/api', insertRouter);
app.use('/api', deleteRouter);
app.use('/api', findRouter);
app.use('/api', updateRouter);

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
  res.render('error');
});

// const PORT = 4000;
// app.listen(PORT, console.log(`Server running on port ${PORT}`));


module.exports = app;
