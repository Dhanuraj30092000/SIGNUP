const { DataTypes } = require('sequelize');



const User = function(sequelize) {

    return sequelize.define('User', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    emailId: {
      type: DataTypes.STRING,
      allowNull : false
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull : false
    }

  }, {
    tableName : "user"
  });
  
}





module.exports = User
