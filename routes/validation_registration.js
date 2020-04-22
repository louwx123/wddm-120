const express = require("express"); 
const router = express.Router();
const bodyParser = require('body-parser');
const userModel= require("../models/User");
const path = require("path");

router.use(bodyParser.urlencoded({ extended: false }));
//load environment variable
require('dotenv').config({path:"./config/keys.env"});


router.post("/", (req,res)=>{
    
  const errors=[];

  if(req.body.email == ""){
      errors.push("Please enter your email address.");  
  }
  if(req.body.password == ""){
      errors.push("Please enter your password.");
  }
  if(req.body.password.length <6 ||req.body.password.length>20){
      errors.push("Password has to be 6-20 characters.");
  }
  if(req.body.password!=req.body.repass){
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
      password:req.body.password
    }

    const user = new userModel(newUser);
    user.save()
    .then((user)=>{
      req.files.profilePic.name = `pro_pic_${user._id}${path.parse(req.files.profilePic.name).ext}`
      req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
      .then(()=>{
        userModel.update({_id:user._id}, {
          profilePic: req.files.profilePic.name
        })
        .then(()=>{
          res.redirect('signinpage');
        })
      })

    })
    .catch(()=>{
      res.redirect('signinpage');

    })








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
