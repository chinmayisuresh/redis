const mongoose = require("mongoose");

module.exports = () => {
    return mongoose.connect("mongodb://localhost:27017/redis" ,{useNewUrlParser: true , useUnifiedTopology: true
,useCreateIndex:true});
}