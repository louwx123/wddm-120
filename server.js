const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const fileUpload = require('express-fileupload')



require('dotenv').config({path:"./config/keys.env"});
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//mongoose
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database${err}`));



//routes


app.use(session({
  secret: `${process.env.SECRET_KEY}`,
  resave: false,
  saveUninitialized: true,
}));

app.use((req,res,next)=>{

  res.locals.user=req.session.userInfo;
  next();

})

app.use(fileUpload());



const home = require('./routes/home');
const login = require('./routes/login');
const registration = require('./routes/registration');
const roomlisting = require('./routes/roomlisting');
const validation_login=require('./routes/validation_login');
const validation_registration=require('./routes/validation_registration');
const logout=require(`./routes/logout`)
const user_dashboard=require('./routes/user_dashboard');
const addrooms=require('./routes/addrooms');
const add_rooms=require('./routes/add_rooms');
const editroom=require('./routes/editroom');






app.use('/', home);
app.use('/signinpage', login);
app.use('/registrationpage', registration);
app.use('/roomlisting', roomlisting);
app.use('/validation_login', validation_login);
app.use('/validation_registration', validation_registration);
app.use(`/logout`, logout);
app.use(`/userDashboard`, user_dashboard);
app.use(`/addrooms`, addrooms);
app.use(`/add_rooms`, add_rooms);
app.use(`/editroom`, editroom);




app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//validation

 


  const PORT = process.env.PORT || 3000;



  app.listen(PORT , ()=>{
  
      console.log(`Web Server is up and running`);
  })


