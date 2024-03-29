"use strict";
const express = require("express");
const app = express();
// Accept JSON:
app.use(express.json());
/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();
/* ------------------------------------------------------- */
//middlewares
// Auhentication:
app.use(require("./src/middlewares/authentication"));

//sorgular
app.use(require("./src/middlewares/queryHandler"));

// Logger:
app.use(require("./src/middlewares/logger"));

// routes/index.js:
app.use("/", require("./src/routes/"));
/* ------------------------------------------------------- */

//HomePath
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to HOTEL API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));
/* ------------------------------------------------------- */

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
