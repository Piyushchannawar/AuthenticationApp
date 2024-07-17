const express = require('express');
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/user-routes.js")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
dotenv.config();



app.use(cookieParser());
app.use(express.json());
app.use("/api",router);


// connection to Db
mongoose.connect("mongodb+srv://auth:auth@cluster0.sit6qp0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to Db");
})


app.get('/',(req,res)=>{
    res.json({msg : "Working"})
})


app.listen(3000,()=>{ console.log("Running on port 3000");})
