'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Project.associate = function(models) {
    // Define many-to-many relationship between Project and User
    Project.belongsToMany(models.User, {
      through: 'ProjectUsers',
      as: 'Users',
      foreignKey: 'projectId',
    });
  };

  return Project;
};
