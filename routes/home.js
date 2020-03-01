const express = require("express"); 
const router = express.Router();
const productModel = require("../models/products");

router.get('/',(req,res)=>{
  res.render("home",{
      title: "AirPnP",
      products : productModel.getallProducts()

  })
})

module.exports = router;
