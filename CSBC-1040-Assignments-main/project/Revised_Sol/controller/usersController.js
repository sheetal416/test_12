var express = require('express');
var router = express.Router();
var userRepo = require('../repo/usersRepo');


router.get('/', function(req, res){
    userRepo.getAllByUser((err, users) => {
        if(err) res.send(err);
        else res.send(users);
    })
});

//export this router to use in our index.js
module.exports = router;