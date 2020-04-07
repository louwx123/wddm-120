const express = require("express"); 
const router = express.Router();

router.get('/',(req,res)=>{
  res.render("registration",{
      title: "Registration",
  });
});

router.post("/", (req,res)=>{
    
  const errors=[];

  if(req.body.email == ""){
      errors.push("Please enter your email address.");  
  }
  if(req.body.pass == ""){
      errors.push("Please enter your password.");
  }
  if(req.body.pass.length <6 ||req.body.pass.length>20){
      errors.push("Password has to be 6-20 characters.");
  }
  if(req.body.pass!=req.body.repass){
      errors.push("Please enter same password twice.")
  }

  if(req.body.repass == ""){
    errors.push("Please re-enter your password.");
  }
  if(req.body.firstName == ""){
    errors.push("Please enter your first name.");
  }
  if(req.body.lastName == ""){
      errors.push("Please enter your last name.");
  }
  if(req.body.phoneNumber == ""){
      errors.push("Please enter your phone number.");
  }   
  
  if(errors.length > 0 )
  {
  res.render("registration",{
      messages:errors
  })
}

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const msg = {
  to: 'peterlou96@gmail.com',
  from: '',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
});


module.exports = router ;
