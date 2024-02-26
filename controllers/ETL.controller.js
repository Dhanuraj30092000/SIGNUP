const ETLCredentialsInit = require("../models/ETLCredentials");
//const bcrypt = require("bcryptjs");
const { Sequelize, Model } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:') //TODO Change this
const sequelize = new Sequelize('mysql://root:12345@127.0.0.1:3306/signup')
var ETLCredentials

setTimeout(async () => {
  ETLCredentials = ETLCredentialsInit(sequelize) 
  await ETLCredentials.sync({ force: false });
  console.log("Database initialized")
  await sequelize.authenticate();

}, 100)

exports.registerETLCredentials = async (req, res) => {
  try {
    console.log("Request is ===> ", req.body)

    reqBody = req.body
   
    const email = reqBody.email;
    const password = reqBody.password;  
    const userId = req.user.id
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);

    parameterObject = {
      
      "password": password,
      "emailId": email,
      "userId" : userId
    }

    saveETLCredentials(parameterObject)

    res.status(201).send(parameterObject);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


async function saveETLCredentials(userData) {
  console.log(`Model created ${ETLCredentials}`)

  const etlCredentials = ETLCredentials.build(userData);
  etlCredentials.save()
}










"