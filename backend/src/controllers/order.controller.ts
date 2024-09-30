import { Request, Response } from "express";
import { Handle } from "../handle/handle";
import HTTPException from "../exception/http.exception";
import Product from "../models/db/Product";
import Order from "../models/db/Order";
import OrderItem from "../models/db/OrderItem";

// export const getOrders = async (req: Request, res: Response) => {
//   const h = new Handle("getOrders", req, res);
//   try {
//     const orders = await Order.findAll({
//       where: {
//         store_id: req.user.store_id,
//       },
//     });

//     if (orders.length === 0) {
//       return h.success("ไม่พบออเดอร์", 404);
//     }

//     h.success(orders, 200);
//   } catch (error) {
//     h.error(error, error, 500);
//   }
// };

// export const createOrder = async (req: Request, res: Response) => {
//   const h = new Handle("createOrder", req, res);
//   const t = await sequelize.transaction();

//   try {
//     const { items } = req.body;

//     if (!items) {
//       throw new HTTPException("กรุณาเลือกสินค้า", 400);
//     }

//     const total_price = items.reduce((total: number, item: { price: number; quantity: number; }) => total + item.price * item.quantity, 0);
//     const order = await Order.create(
//       {
//         user_id: req.user.id,
//         total_price,
//         store_id: req.user.store_id,
//         created_by: req.user.id,
//       },
//       { transaction: t }
//     );

//     const orderItems = items.map((item: { product_id: number; quantity: number; price: number; }) => ({
//       order_id: order.id,
//       product_id: item.product_id,
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     // ลดจำนวนสินค้าคงเหลือในตาราง products
//     for (let item of items) {
//       const product = await Product.findByPk(item.product_id);
//       if (!product || product.quantity < item.quantity) {
//         return h.error("สินค้าบางรายการมีไม่เพียงพอ", 400);
//       }
//       product.quantity -= item.quantity;
//       await product.save({ transaction: t });
//     }

//     await OrderItem.bulkCreate(orderItems, { transaction: t });

//     await t.commit();

//     h.success("ซื้อสินค้าสำเร็จ", 201);
//   } catch (error) {
//     await t.rollback();
//     h.error(error, error, 500);
//   }
// };
