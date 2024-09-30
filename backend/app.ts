import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { logger } from "./src/utils/logger.util";

const app = express();

const origin = process.env.NODE_ENV === "development" ? ["http://localhost:8080"] : []
const corsConfig = {
  origin: origin,
  credentials: true
};

app.use(bodyParser.json());
app.use(cors(corsConfig));

import authRoute from "./src/routes/auth.route";
app.use("/auth", authRoute);

import productRoute from "./src/routes/product.route";
app.use("/product", productRoute);

import orderRoute from "./src/routes/order.route";
app.use("/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Healthy");
});

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
