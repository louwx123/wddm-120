const express = require("express"); 
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))


router.post("/", (req,res)=>{

  const errors=[];

  if(req.body.email == ""){
      errors.push("Please enter your Email."); 
  }
  if(req.body.logpass == ""){
      errors.push("Please enter your password.");
  }
  if(errors.length > 0 )
  {
  res.render("login",{
      messages:errors
  })
}
});
module.exports = router ;
