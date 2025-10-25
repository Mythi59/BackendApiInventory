import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connectionDB.js";

export class Product extends Model {}

Product.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    batchNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);

Product.associations = (models) => {
  Product.hasMany(models.DetailsPurchase, {
    foreignKey: "productId",
    as: "purchaseDetails",
  });

  return Product;
};
