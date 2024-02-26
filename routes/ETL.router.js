const express = require("express");
const router = express.Router();
const authentionMiddleWare = require("../middleware/authentication.middleware")

const registerETLCredntialsController = require("../controllers/ETL.controller");

// login cheythal mathram access ulla resource
router.post("/etl/credentials", authentionMiddleWare , registerETLCredntialsController.registerETLCredentials);


module.exports = router
