"use strict";

const router = require("express").Router();

//auth
router.use("/auth", require("./auth"));
// users:
router.use("/user", require("./user"));

//room :
router.use("/room", require("./room"));
//token
router.use("/token", require("./token"));

//reservation
router.use("/reservation", require("./reservation"));

module.exports = router;
