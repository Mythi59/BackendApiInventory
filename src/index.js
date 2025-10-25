import { app } from "./app.js";
import { sequelize } from "./database/connectionDB.js";
import { Product } from "./models/productModel.js";
import { User } from "./models/userModel.js";
import { DetailsPurchase } from "./models/detailPurchaseModel.js";
import { Purchase } from "./models/purchaseModel.js";

async function main() {
  await sequelize.sync({ force: false }).then(() => {
    console.log("Database connected");
  });

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
