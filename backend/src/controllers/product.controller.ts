import { Request, Response } from "express";
import { Handle } from "../handle/handle";
import HTTPException from "../exception/http.exception";
import Product from "../models/db/Product";
import StockHistory from "../models/db/StockHistory";

// export const getProducts = async (req: Request, res: Response) => {
//   const h = new Handle("getProducts", req, res);
//   try {
//     const products = await Product.findAll({
//       where: {
//         store_id: req.user.store_id,
//       },
//     });

//     if (products.length === 0) {
//       return h.success("ไม่พบสินค้า", 404);
//     }

//     h.success(products, 200);
//   } catch (error) {
//     h.error(error, error, 500);
//   }
// };

// export const createProduct = async (req: Request, res: Response) => {
//   const h = new Handle("createProduct", req, res);
//   try {
//     const { name, price, quantity, image_url } = req.body;
//     if (!name) {
//       throw new HTTPException("กรุณากรอกชื่อสินค้า", 400);
//     }
//     if (!price) {
//       throw new HTTPException("กรุณากรอกราคาสินค้า", 400);
//     }
//     if (!quantity) {
//       throw new HTTPException("กรุณากรอกจำนวนสินค้า", 400);
//     }

//     const product = await Product.create({
//       name,
//       price,
//       quantity,
//       image_url,
//       store_id: req.user.store_id,
//       created_by: req.user.id,
//     });

//     h.success("เพิ่มสินค้าสำเร็จ", 201);
//   } catch (error) {
//     h.error(error, error, 500);
//   }
// };

// export const addProductStock = async (req: Request, res: Response) => {
//   const h = new Handle("addProductStock", req, res);
//   const t = await sequelize.transaction();

//   try {
//     const { items } = req.body;

//     if (!items) {
//       throw new HTTPException("กรุณาเลือกสินค้า", 400);
//     }

//     const productItems = items.map((item: { product_id: number; quantity: number }) => ({
//       product_id: item.product_id,
//       quantity: item.quantity,
//       created_by: req.user.id,
//     }));

//     // เพิ่มจำนวนสินค้าคงเหลือในตาราง products
//     for (let item of items) {
//       const product = await Product.findByPk(item.product_id);
//       if (!product) {
//         return h.error("ไม่พบสินค้าที่คุณต้องการเพิ่มจำนวน", 400);
//       }
//       product.quantity += item.quantity;
//       await product.save({ transaction: t });
//     }

//     // บันทึกการเพิ่มสินค้าใน stock history
//     await StockHistory.bulkCreate(productItems, { transaction: t });

//     await t.commit();

//     h.success("เพิ่มจำนวนสินค้าสำเร็จ", 201);
//   } catch (error) {
//     await t.rollback();
//     h.error(error, error, 500);
//   }
// };
