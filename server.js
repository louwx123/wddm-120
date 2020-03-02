const express = require("express");
const exphbs  = require('express-handlebars');

const bodyParser = require('body-parser')
const app = express();

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


