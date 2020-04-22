const express = require("express"); 
const router = express.Router();
const userModel= require("../models/User");
const bcrypt = require("bcryptjs");

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))


router.post("/", (req,res)=>{
    userModel.findOne({email:req.body.email})
    .then(user=>{
        const errors=[];
        //email not found
        if(user==null){
            errors.push("Sorry, your email address and/or password is incorrect.")
            res.render("login",{
                messages:errors
            });

        }
        //email is found
        else{
            bcrypt.compare(req.body.password, user.password)
            .then(isMatched=>{
                if(isMatched){
                    //create session
                    req.session.userInfo = user;
                    res.redirect('userDashboard');

                }
                else{
                    errors.push("Sorry, your email address and/or password is incorrect");
                    res.render("login",{
                        messages: errors
                    })
                    

                }
                


            })
            .catch(err=>console.log(`Error ${err}`));


        }


    })
    .catch(err=>console.log(`Error ${err}`));


//   const errors=[];

//   if(req.body.email == ""){
//       errors.push("Please enter your Email."); 
//   }
//   if(req.body.logpass == ""){
//       errors.push("Please enter your password.");
//   }
//   if(errors.length > 0 )
//   {
//   res.render("login",{
//       messages:errors
      
//   })
// }
});
module.exports = router ;
