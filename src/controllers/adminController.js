import { DetailsPurchase } from "../models/detailPurchaseModel.js";
import { Product } from "../models/productModel.js";
import { Purchase } from "../models/purchaseModel.js";
import { User } from "../models/userModel.js";

export async function getAllPurchase(request, response) {
  try {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: DetailsPurchase,
          as: "details",
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    response.json({
      total: purchases.length,
      purchases,
    });
  } catch (error) {
    console.error("Error fetching all purchases:", error);
    response
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

export async function getPurchaseByClient(request, response) {
  try {
    const { clientId } = request.params;
    const purchases = await Purchase.findAll({
      where: { userId: clientId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: DetailsPurchase,
          as: "details",
          include: [
            {
              model: Product,
              as: "product",
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    response.json({
      total: purchases.length,
      purchases,
    });
  } catch (error) {
    console.error("Error fetching purchases by client:", error);
    response
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
