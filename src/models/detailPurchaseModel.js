// src/models/detailPurchaseModel.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connectionDB.js";

export class DetailsPurchase extends Model {}

DetailsPurchase.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    purchaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "purchases",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "DetailsPurchase",
    tableName: "detailsPurchases",
  }
);
