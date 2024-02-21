const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authentionMiddleWare = require("../middleware/authentication.middleware")


router.post("/register", userController.register);
router.get("/users", userController.getAllUser);
router.post("/login", userController.login);

router.get("/me", authentionMiddleWare , userController.me);




module.exports=router;


