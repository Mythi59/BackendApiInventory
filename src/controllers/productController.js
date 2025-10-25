import { Product } from "../models/productModel.js";

export const createProduct = async (request, response) => {
  try {
    const { batchNumber, name, quantity, price } = request.body;

    const newInventory = await Product.create({
      batchNumber,
      name,
      quantity,
      price,
    });

    return response.status(200).json(newInventory);
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Error creating inventory" });
  }
};

export const updateProduct = async (request, response) => {
  try {
    const { id } = request.body;
    const { batchNumber, name, quantity, price } = request.body;

    const inventory = await Product.update(
      {
        batchNumber,
        name,
        quantity,
        price,
      },
      {
        where: { id: id },
      }
    );

    if (inventory === 0) {
      return response.status(404).json({ message: "Inventory not found" });
    }

    return response
      .status(200)
      .json({ message: "Inventory updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Error updating inventory" });
  }
};
