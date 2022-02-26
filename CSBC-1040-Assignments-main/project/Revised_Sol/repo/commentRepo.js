var db = require('../db');

exports.getAllCommentByPostId = (postId, done) => {
    db.connect((err, conn) => {
        if(err) {
            console.log('Conn fail: ', err);
            return done(new Error('Conn fail'), null);
        }
        conn.query('SELECT * FROM comments WHERE postId = ?', postId, (err, rows) => {
            done(err, rows)
        })
    })
}