const UserInit = require("../models/User");
const bcrypt = require("bcryptjs");
const { Sequelize, Model } = require('sequelize');


//const sequelize = new Sequelize('mysql://root:12345@127.0.0.1:3306/signup')
const sequelize = new Sequelize('sqlite::memory:')
var User


setTimeout(async () => {
  User = UserInit(sequelize)
  await User.sync({ force: true });
  console.log("Database initialized")
  await sequelize.authenticate();

}, 100)

/*
express --> routes (he checked) --> ethu request --> ethu controller

brower -----> text(header, body, cookie, url) ---> server(express) ---> (req, res) ---> usercpontroller ---> {
  custom logic


}
*/


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
        res.status(200).send({
          "status": "Login success",
          "message": "Use token in subsequent requests"
        });
      } else {
        res.status(401).send({ "status": "Login failure" });
      }
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


async function saveUser(userData) {
  console.log(`Model created ${User}`)

  const user = User.build(userData);
  user.save()
}

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
