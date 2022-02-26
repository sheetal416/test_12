var db = require('../db');

exports.getAllByUser = (done) => {
    db.connect((err, conn) => {
        if(err) {
            console.log('Conn fail: ', err);
            return done(new Error('Conn fail'), null);
        }
        conn.query('SELECT * FROM users', (err, rows) => {
            done(err, rows)
        })
    })
}