const cors = require("cors");
const createError = require("http-errors");
const express = require("express"); 
var bodyParser = require('body-parser');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const port = 3001;

const indexRouter = require("./routes/index");
const groceriesRouter = require("./routes/grocery");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

/**
 * Database
 */
// const db = require("./app/models/index");
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
var bodyParser = require('body-parser')
/**
 * Routes
 */
app.use("/", indexRouter);
app.use("/api/grocery", groceriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
