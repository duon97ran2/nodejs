// const http = require("http");

// const server = http.createServer((req,res)=>{
//   console.log(req.url);
//   const url = req.url;
//   if(url==="/api/products"){
//     const data =[
//       {id:1, name:"Product A"},
//       {id:2, name:"Product B"}
//     ];
//     res.end(JSON.stringify(data))
//   }else if(url === "/api/posts"){
//     console.log("API post");
//   }else{
//     res.setHeader("Content-Type","text/html");
//     res.write("<html><body><h1>HOME PAGE</h1></body></html>");
//     res.end();
//   }
// });
// const PORT = 4000;
// server.listen(PORT,()=>{
//   console.log("Server is running",PORT);
// });
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
dotenv.config();


const app = express();
const swaggerJSDOcs = YAML.load("api.yaml");
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDOcs));

app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api", userRouter);
app.use("/api", authRouter);

mongoose.connect(process.env.MONGODB_LOCAL).then(() => console.log("connect successfully")).catch(errors => console.log(errors));

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>
  console.log("Server is running", PORT)
);