const express = require("express"); 
const router = express.Router();

router.get('/',(req,res)=>{

  res.render("login",{
      title: "Login Page",
  })
})

router.post("/", (req,res)=>{

  const errors=[];

  if(req.body.logname == ""){
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
