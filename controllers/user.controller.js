const UserInit = require("../models/User");
const bcrypt = require("bcryptjs");
const { Sequelize, Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authentication.middleware');

const sequelize = new Sequelize('sqlite::memory:') //TODO Change this
//const sequelize = new Sequelize('mysql://root:12345@127.0.0.1:3306/signup')
var User

setTimeout(async () => {
  User = UserInit(sequelize)
  await User.sync({ force: false });
  console.log("Database initialized")
  await sequelize.authenticate();

}, 100)


exports.register = async (req, res) => {
  try {
    console.log("Request is ===> ", req.body)

    reqBody = req.body
    const firstName = reqBody.firstName;
    const lastName = reqBody.lastName;
    const email = reqBody.email;
    const companyName = reqBody.companyName;
    const password = reqBody.password;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    parameterObject = {
      "companyName": companyName,
      "firstName": firstName,
      "lastName": lastName,
      "password": hashedPassword,
      "emailId": email
    }

    saveUser(parameterObject)

    res.status(201).send(parameterObject);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Move this to new file
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.me = async (req, res) => {
  try {
    const currentUser = req.user
    res.status(200).send(currentUser);
  } catch (error) {
    res.status(500).send({ "message" : error.message });
  }
};


exports.login = async (req, res) => {
  try {
    console.log("Request is ===> ", req.body)
    const emailId = req.body.email
    const plainTextPassword = req.body.password

    const userindb = await User.findOne({ where: { emailId: emailId } });
    if (userindb === null) {
      res.status(401).send({ "status": "Login failed" });
    } else { // User is there, now we need to check password
      const passwordMatched = comparePassword(plainTextPassword, userindb.password)
      if (passwordMatched) {
        const token = jwt.sign(userindb.toJSON(), 'iam a secret key', { 

          /* Jwt.sign requires the object that is passed to be serialisable,
           Mongoose User object is not serialisable, 
          but if you call userInDb.toJSON() then mongoose will return a serialisable version */

          expiresIn: '48h'
        });
        res.status(200).send({
          "status": "Login success",
          "token": token,
          "message": "Use token in subsequent requests"
        });
      } else {
         
        res.status(401).send({ "status": "Login failure" });
      }
    }

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: error.message });
  }
};


// All utility functions should be here, below

async function saveUser(userData) {
  console.log(`Model created ${User}`)

  const user = User.build(userData);
  user.save()
}


async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}








