'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, { foreignKey: 'groupId' });
      this.belongsTo(models.Admin, { foreignKey: 'adminId' });
    }
  }
  Group.init(
    {
      number: DataTypes.INTEGER,
      adminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Group',
    }
  );
  return Group;
};
