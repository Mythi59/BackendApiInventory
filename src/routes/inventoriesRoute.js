import { Router } from "express";
import {
  getAllPurchase,
  getPurchaseByClient,
} from "../controllers/adminController.js";
import {
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import {
  purchaseProducts,
  getPurchaseHistory,
  getInvoice,
} from "../controllers/purchaseController.js";
import {
  createNewUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { isAdministrator, isClient } from "../middleware/auth.js";
const router = Router();
// Product routes
router.post("/createProduct", createProduct);
router.put("/updateProduct", updateProduct);
// Purchase client routes
router.post("/", isClient, purchaseProducts);
router.get("/history", isClient, getPurchaseHistory);
router.get("/invoice/:id", isClient, getInvoice);
// User routes
router.post("/createUser", createNewUser);
router.get("/getUser", getUserById);
router.put("/updateUser", updateUser);
// Admin routes
router.get("/admin/allPurchases", isAdministrator, getAllPurchase);
router.get("/admin/client/:clientId", isAdministrator, getPurchaseByClient);

export default router;
