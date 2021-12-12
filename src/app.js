const express=require("express");

const app = express();
app.use(express.json());

const connect = require("./config/db")



const productController=require("./controllers/product.controller");
app.use("/products",productController);

app.listen(2446, () => {
    connect();
    console.log("listening 2446")
})



