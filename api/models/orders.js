"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orders.init(
    {
      codigo: DataTypes.STRING,
      reg_origem: DataTypes.STRING,
      reg_destino: DataTypes.STRING,
      cod_loggi: DataTypes.STRING,
      cod_vendedor: DataTypes.STRING,
      tipo_produto: DataTypes.STRING,
      isvalid: DataTypes.BOOLEAN,
      invalidObs: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
