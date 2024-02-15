const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.get("/users", userController.getAllUser);
router.post("/login", userController.login);


module.exports=router;


