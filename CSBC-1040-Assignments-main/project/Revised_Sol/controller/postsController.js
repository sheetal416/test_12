var express = require('express');
var router = express.Router();
var postRepo = require('../repo/postsRepo');
var commRepo = require('../repo/commentRepo');
const auth = require('../auth');

router.get('/',auth.authenticateToken, function(req, res){
    postRepo.getAllPostByUser((err, users) => {
        if(err) res.send(err);
        else res.send(users);
    }, req.user)
});

router.get('/:id',auth.authenticateToken, function(req, res) {
    postRepo.getAllPostIdByUser(req.user, req.params.id, (err, users) => {
        if(err) res.send(err);
        else res.send(users.filter(u => u?.id == req.params.id));
    })
});

router.get('/:id/comments',auth.authenticateToken, function(req, res){
    const userId = req.query.userId;
    console.log('userId: ', userId);
    commRepo.getAllCommentByPostId(req.params.id, (err, users) => {
        if(err) res.send(err);
        else res.send(users);
    })
});


router.post('/',auth.authenticateToken, function(req, res){
    postRepo.postAPost((err, users) => {
        if(err) res.send(err);
        else res.send(req?.body);
    }, req.user)
});

//export this router to use in our index.js
module.exports = router;