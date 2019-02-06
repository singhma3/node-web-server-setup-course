const express = require('express');
const hbs = require('hbs');
const os = require('os');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');



hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} URL: ${req.url}`;
fs.appendFile('server.log',log + '\n', (err)=>{
  if(err){
      console.log("Unable to log details");
  }
});
console.log(log);
next();
})

// app.use((req, res, next)=>{
//   res.render('maintanence.hbs',{
//     errorMessage: 'We will be Back soon'
//   })
// })
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: `Welcome ${os.userInfo().username}`,
    desc: 'This is a home page'
  });
})

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    welcomeMessage: `Welcome ${os.userInfo().username}`,
    desc: 'This is a about page'
  });
})

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage: 'Invalid URL'
  });
})

app.listen(3000);
