const express = require("express");
const exphbs  = require('express-handlebars');

const bodyParser = require('body-parser')
const app = express();

app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//routes
app.get("/",(req,res)=>{
    res.render("home",{
        title: "AirPnP",
        headingInfo : "Home Page",
    })
});

app.get("/room-listing",(req,res)=>{
    res.render("roomListing",{
        title: "Room Lsting",

    });
});

app.get("/registrationpage",(req,res)=>{
  res.render("registration",{
      title: "Registration",
  });
});

app.get("/signinpage",(req,res)=>{

  res.render("login",{
      title: "Login Page",
  });
});

//validation
app.post("/validation-registration", (req,res)=>{
    
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
  });

  app.post("/validation-login", (req,res)=>{

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





const PORT=3000;
app.listen(3000,()=>{
    console.log(`Web Server connected!!!`);
})