const express = require('express');
const app = express();
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware number 1
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to log server file.');
    }
  });
  console.log();
  next();
});

app.use( (req, res) => {
  // if( req.url === "/" ) {
    res.render('maintain.hbs');
  // }
});
app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getYear', () => new Date().getFullYear());

app.get('/', (request, response) => {
  response.render('home.hbs',{
    pageTitle: 'My home page',
    pageHeading: 'Welcome to HOme page',
    pagePara: 'Perfectly working!',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.send({
    name : 'Rehan Sattar',
    fatherName: 'Abdul Sattar',
    age : 19,
    gender : 'male',
    hobbies : [
      'Cricket ',
      'gaming',
      'Programing',
    ],
    languages : [
      'C',
      'C++',
      'Python',
      'HTML',
      'CSS',
      'Bootstrap',
      'Javascript',
      'React',
      'React Native'
    ]
  });
  res.render('about.hbs' , {
    pageTitle: 'My page',
    pageHeading: 'Welcome to About page',
    pagePara: 'Perfectly working!',
    currentYear: new Date().getFullYear()

  });
});


app.get('/bad', (req,res) => {
  res.send({
    error: "This page Can't load",
    status: 400
  });
});
app.listen(port);
