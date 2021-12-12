const Product = require("../models/product.model.");

const express = require("express");

const router = express.Router();

const redis=require('../config/redis.js');

router.post('/',async (req,res)=>{
     const product=await Product.create(req.body);

     redis.set(`products.${product._id}`,JSON.stringify(product));

     const products=await Product.find().lean().exec();
     redis.set("products",JSON.stringify(products));
     return res.send(product);
})

router.get('/',async(req,res)=>{

    const items=await redis.get('products');
    if(items){
        
        return res.send({fromcache:JSON.parse(items)});
    }
    
    const products=await Product.find().lean().exec();
    redis.set('products',JSON.stringify(products));
    return res.send({products});
})

router.get('/:id',async(req,res)=>{
try{
    const item=await redis.get(`products.${req.params.id}`);
    if(item){
        
        return res.send({fromcache:JSON.parse(item)});
    }
    
    const products=await Product.findById(req.params.id).lean().exec();
    redis.set(`products.${products._id}`,JSON.stringify(products));
    return res.send({products});}
    catch(e){
        res.send(e.message);
    }
})

router.patch('/:id',async(req,res)=>{

    const products=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    redis.set(`products.${products._id}`,JSON.stringify(products));
    return res.send({products});
    
})

router.delete('/:id',async(req,res)=>{

    const products=await Product.findByIdAndDelete(req.params.id).lean().exec();
    redis.del(`products.${products._id}`,JSON.stringify(products));
    return res.send({products});
    
})


module.exports=router;