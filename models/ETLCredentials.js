const {  DataTypes } = require('sequelize');



const  ETLCredentials = function(sequelize) {

    return sequelize.define('ETLCredentials', {
    // Model attributes are defined here
    
    userId: {
      type: DataTypes.INTEGER
    },

    emailId: {
      type: DataTypes.STRING,
      allowNull : false
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    }

  

  }, {
    tableName : "etl_credentials"
  });
  
}



module.exports = ETLCredentials