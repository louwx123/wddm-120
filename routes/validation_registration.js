const express = require("express"); 
const router = express.Router();
const bodyParser = require('body-parser');
const userModel= require("../models/User");


router.use(bodyParser.urlencoded({ extended: false }));
//load environment variable
require('dotenv').config({path:"./config/keys.env"});


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
  }else{
    const newUser = 
    {
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:req.body.pass
    }

    const user = new userModel(newUser);
    user.save()
    .then(()=>{
      res.redirect('/roomlisting');

    })
    .catch(err=>console.log(`Error while inserting into the data${err}`))








    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
      to: req.body.email,
      from: 'louwx@my.yorku.ca',
      subject: 'Welcome!',
      text: 'Welcome to AirPnP',
      html: '<strong>Welcome to AirPnP. Yours to discover.</strong>',
    };
    sgMail.send(msg);

    const accountSid = 'AC884e7df64033bb9277e31e4f922964ac';
    const authToken = process.env.TWILIO_AUTHTOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
      body: 'Welcome to AirPnP',
      from: '+14043692027',
      to: req.body.phoneNumber
    })
    .then(message => console.log(message.sid));

    }
});

module.exports = router ;
