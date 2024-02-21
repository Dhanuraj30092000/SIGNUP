const express = require("express");
const router = express.Router();
const authentionMiddleWare = require("../middleware/authentication.middleware")

const resourceController = require("../controllers/resource.controller");

// login cheythal mathram access ulla resource
router.get("/dw/credentials", authentionMiddleWare , resourceController.getCredentials);


module.exports = router




