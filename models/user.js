'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Admin', 'Manager', 'Employee']],
      },
    },
  }, {});

  User.associate = function(models) {
    // Define many-to-many relationship between User and Project
    User.belongsToMany(models.Project, {
      through: 'ProjectUsers',
      as: 'Projects',
      foreignKey: 'userId',
    });
  };

  return User;
};
