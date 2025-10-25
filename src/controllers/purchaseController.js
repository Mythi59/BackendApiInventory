import { DetailsPurchase } from "../models/detailPurchaseModel.js";
import { Product } from "../models/productModel.js";
import { Purchase } from "../models/purchaseModel.js";
import { User } from "../models/userModel.js";
import { sequelize } from "../database/connectionDB.js";

export async function purchaseProducts(request, response) {
  const transaction = await sequelize.transaction();

  try {
    const { products } = request.body;
    const { userId } = request.body.user;

    if (!products || products.length === 0) {
      await transaction.rollback();
      return response.status(400).json({ message: "No products provided" });
    }

    let totalAmount = 0;
    const detailPurchases = [];

    for (const item of products) {
      const product = await Product.findByPk(item.productId, { transaction });

      if (!product) {
        await transaction.rollback();
        return response
          .status(404)
          .json({ message: `Product with ID ${item.productId} not found` });
      }

      if (product.quantity < item.quantity) {
        await transaction.rollback();
        return response.status(400).json({
          message: `Insufficient stock for product "${product.name}". Available: ${product.quantity}`,
        });
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      detailPurchases.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemTotal,
      });

      // Actualizar stock
      await product.update(
        {
          quantity: product.quantity - item.quantity,
        },
        { transaction }
      );
    }

    // Crear la compra
    const purchase = await Purchase.create(
      {
        userId: userId,
        totalAmount: totalAmount,
      },
      { transaction }
    );

    // Crear los detalles
    for (const detail of detailPurchases) {
      await DetailsPurchase.create(
        {
          purchaseId: purchase.id,
          productId: detail.productId,
          quantity: detail.quantity,
          price: detail.price,
          subtotal: detail.subtotal,
        },
        { transaction }
      );
    }

    await transaction.commit();

    // Obtener la compra completa
    const completePurchase = await Purchase.findByPk(purchase.id, {
      include: [
        {
          model: DetailsPurchase,
          as: "details",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    response.status(201).json({
      message: "Purchase completed successfully",
      purchase: completePurchase,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error processing purchase:", error);
    response
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

export async function getPurchaseHistory(request, response) {
  try {
    const { userId } = request.body.user;

    const purchases = await Purchase.findAll({
      where: { userId },
      include: [
        {
          model: DetailsPurchase,
          as: "details",
          include: [{ model: Product, as: "product" }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    response.status(200).json({
      total: purchases.length,
      purchases,
    });
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    response
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

export async function getInvoice(request, response) {
  try {
    const purchaseId = request.params.id;
    const { userId } = request.body.user;

    const purchase = await Purchase.findOne({
      where: { id: purchaseId, userId: userId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: DetailsPurchase,
          as: "details",
          include: [{ model: Product, as: "product" }],
        },
      ],
    });

    if (!purchase) {
      return response.status(404).json({ message: "Purchase not found" });
    }

    response.status(200).json({
      purchase,
    });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    response
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}
