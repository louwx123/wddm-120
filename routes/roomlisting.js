const express = require("express"); 
const productModel = require("../models/products.js");
const router = express.Router();
router.get('/',(req,res)=>{
  res.render("roomlisting",{
      title: "Room Lsting",
      products : productModel.getallProducts()


  })
})

module.exports = router;

