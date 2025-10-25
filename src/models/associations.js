import { User } from "./userModel.js";
import { Product } from "./productModel.js";
import { Purchase } from "./purchaseModel.js";
import { DetailsPurchase } from "./detailPurchaseModel.js";

// User - Purchase (Un usuario tiene muchas compras)
User.hasMany(Purchase, {
  foreignKey: "userId",
  as: "purchases",
});

Purchase.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Purchase - DetailsPurchase (Una compra tiene muchos detalles)
Purchase.hasMany(DetailsPurchase, {
  foreignKey: "purchaseId",
  as: "details",
});

DetailsPurchase.belongsTo(Purchase, {
  foreignKey: "purchaseId",
  as: "purchase",
});

// Product - DetailsPurchase (Un producto puede estar en muchos detalles)
Product.hasMany(DetailsPurchase, {
  foreignKey: "productId",
  as: "purchaseDetails",
});

DetailsPurchase.belongsTo(Product, {
  foreignKey: "productId",
  as: "product",
});

export { User, Product, Purchase, DetailsPurchase };
