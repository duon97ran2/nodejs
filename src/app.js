import express from "express";
import cors from "cors";
import productRoute from "./routes/product.js";
import morgan from "morgan";
import mongoose from "mongoose";
import { readdirSync } from "fs";
import path, { dirname } from "path";
import categoryRoute from "./routes/categories";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
dotenv.config({ path: __dirname + "/configs/.env" });


const app = express();
const swaggerJSDOcs = YAML.load(__dirname + "/configs/api.yaml");
app.use(morgan('tiny'));
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDOcs));

app.use(cors());

app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", userRouter);
app.use("/api", authRouter);

mongoose.connect(process.env.MONGODB_ONLINE).then(() => console.log("connect successfully")).catch(errors => console.log(errors));

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log("Server is running", PORT)
);