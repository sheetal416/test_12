var db = require('../db');

exports.getAllPostByUser = (done, email) => {
    db.connect((err, conn) => {
        if(err) {
            console.log('Conn fail: ', err);
            return done(new Error('Conn fail'), null);
        }
        console.log('query start for posts of user email: ', email);
        conn.query('SELECT * FROM csbs1030.posts WHERE userId=(select id from csbs1030.users where email=?)', 
        email, 
        (err, rows) => {
            done(err, rows)
        })
    })
}

exports.getAllPostIdByUser = (email, postId, done) => {
    db.connect((err, conn) => {
        if(err) {
            console.log('Conn fail: ', err);
            return done(new Error('Conn fail'), null);
        }
        console.log('query start for posts of user email: ', email, ' ,PostId: ', postId);
        conn.query('SELECT * FROM posts WHERE userId=(select id from csbs1030.users where email=?)',
        email, (err, rows) => {
            done(err, rows)
        })
    })
}

exports.postAPost = (callback, email) => {
    console.log(email);
    callback(null);
}