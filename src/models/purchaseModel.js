import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connectionDB.js";

export class Purchase extends Model {}

Purchase.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    datePurchased: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "completed", "candeled"),
      defaultValue: "completed",
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Purchase",
    tableName: "purchases",
  }
);

Purchase.associations = (models) => {
  Purchase.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });

  Purchase.hasMany(models.PurchaseItem, {
    foreignKey: "purchaseId",
    as: "details",
  });

  return Purchase;
};
