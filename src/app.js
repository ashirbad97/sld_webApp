const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const viewsRouter = require('./routers/views')
const cookieParser = require('cookie-parser')
require ('./db/mongoose')

const app = express()
const morgan = require('morgan')
// app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

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
app.use(viewsRouter)

// For any of the un-handled routes
app.get('*',(req,res)=>{
  res.render('error')
})

//Setting up the CORS functionality in Express for Making AJAX calls
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });

app.set('views',viewsPath)
app.set('view engine','hbs')


app.listen(80,()=>{
    console.log('Server Started on Port 80')
})

