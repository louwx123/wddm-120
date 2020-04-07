const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config({path:"./config/keys.env"});

//mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log(`Connected to MongoDB Database`);
})
.catch(err=>console.log(`Error occured when connecting to database${err}`));



//routes
const home = require('./routes/home');
const login = require('./routes/login');
const registration = require('./routes/registration');
const roomlisting = require('./routes/roomlisting');
const validation_login=require('./routes/validation_login')
const validation_registration=require('./routes/validation_registration')


app.use('/', home);
app.use('/signinpage', login);
app.use('/registrationpage', registration);
app.use('/roomlisting', roomlisting);
app.use('/validation_login', validation_login);
app.use('/validation_registration', validation_registration);




app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//validation

 





  const PORT = process.env.PORT || 3000;
  app.listen(PORT , ()=>{
  
      console.log(`Web Server is up and running`);
  })


