import { Router } from "express";
// import { getProducts, createProduct, addProductStock } from "../controllers/product.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

// router.get("/", auth, getProducts);
// router.post("/create", auth, createProduct);
// router.post("/stock/create", auth, addProductStock);

export default router;
