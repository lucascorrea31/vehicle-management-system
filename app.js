const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

// Importar rotas
const vehicleRoutes = require("./routes/vehicles");
const driverRoutes = require("./routes/drivers");
const usageRoutes = require("./routes/usages");

// Conectar ao MongoDB
const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "car-rental";
const dbUser = process.env.DB_USER || "admin";
const dbPass = process.env.DB_PASS || "admin";

mongoose.connect(
	`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/?retryWrites=true&w=majority&appName=${dbName}`
);

const app = express();
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Usar rotas
app.use("/vehicles", vehicleRoutes);
app.use("/drivers", driverRoutes);
app.use("/usages", usageRoutes);

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

module.exports = app;
