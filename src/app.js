import express from "express";
import routerProduct from "./routes/inventoriesRoute.js";

export const app = express();
app.use(express.json());
app.use("/api/Inventory", routerProduct);
