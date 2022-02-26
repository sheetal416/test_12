const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const jwt = require('jsonwebtoken');
const auth = require('./auth');

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//To parse json data
app.use(bodyParser.json())

function generateAccessToken(username) {
   return jwt.sign(username, 'seceret', { expiresIn: '1800s' });
}



//Middleware function to log request protocol
app.use('/', function(req, res, next){
   console.log("A request received at " + Date.now());
   next();
});

app.get('/', auth.authenticateToken, function(req, res){
   console.log(req.user);
   res.send("Hello world! ");
});


app.post('/login', function(req, res){
   console.log('Token generating for user: ', req.body.username);
   const token = generateAccessToken({ username: req.body.username });
   res.json({token});
});

var posts = require('./controller/postsController');
app.use('/posts', posts);

var users = require('./controller/usersController');
app.use('/users', users);

app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});



// Connect to MySQL on start
db.connect(function(err) {
   if(err) {
      console.log('Connection Fail ', err);
   } else {
      db.createUsers((err) => {
         if(err) {
            console.log('Error while creating users table !!')
            return;
         }
         console.log('Created user table !!')
      });

      //create post table and insert
      db.createPosts((err) => {
         if(err) {
            console.log('Error while creating posts table !!')
            return;
         }
         console.log('Created posts table !!')
      });

      //create comments table and insert
      db.createComments((err) => {
         if(err) {
            console.log('Error while creating comments table !!')
            return;
         }
         console.log('Created comments table !!')
      });

      app.listen(3000, function() {
         console.log('Listening on port 3000...')
      })
   }
})
