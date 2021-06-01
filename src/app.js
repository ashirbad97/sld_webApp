const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const viewsRouter = require('./routers/views')
const cookieParser = require('cookie-parser')
const https = require('https')
const fs = require('fs')
// const helmet = require('helmet')
// const morgan = require('morgan')
require ('./db/mongoose')

const app = express()

// Defining Paths and Directories
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const publicCertificatePath = path.join(__dirname,'sslcert/dyslx.ashirbad.me.cer')
const privateCertificatePath = path.join(__dirname,'sslcert/dyslx.ashirbad.me.key')

//  Path for SSL certificates
const options = {
  cert: fs.readFileSync(publicCertificatePath),
  key: fs.readFileSync(privateCertificatePath)
};

// Configuring hbs template engine

hbs.registerPartials(partialsPath)
hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper('ifGreat', function(v1, v2, options) {
  if(v1 < v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
      
  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});

// Configuring Express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(express.static(publicDirectoryPath))
// app.use(helmet())
// app.use(morgan('combined'))

// Middleware function to setup CORS and Force HTTPS, * Has to be placed before assigning any routers else won't work
app.use(function(req, res, next) {
    // Forcing HTTPS, * This forces all the connection to go through HTTPS as a hard forcing 
    if (!req.secure)
      return res.redirect(301,"https://" + req.headers.host + req.url);
    // Setup CORS Functionality
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Assigning the 'Views' Router
app.use(viewsRouter)

// For any of the un-handled routes
app.get('*',(req,res)=>{
  res.render('error')
})
// Setting of templates directory
app.set('views',viewsPath)
// Assigning hbs configurations
app.set('view engine','hbs')

app.listen(80)

https.createServer(options, app).listen(443,()=>{
  console.log("Secure Server has started running")
});
