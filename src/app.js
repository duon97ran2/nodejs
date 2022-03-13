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

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use("/api",productRoute);

mongoose.connect("mongodb://0.0.0.0:27017/we16310").then(()=>console.log("connect successfully")).catch(errors=>console.log(errors));


app.listen(4000,()=>
  console.log("Server is running",4000)
);