var mysql = require('mysql')
var users = require('./data/users')
var posts = require('./data/posts')
var comments = require('./data/comments')

var connection = null;

exports.connect = (connDone) => {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sheetal@416',
        database: 'csbs1040'
    });
    connDone(null, connection);
}

exports.createUsers = (isUsersCreated) => {
    if(!connection) return isUsersCreated(new Error('Not Connected !!'));

    connection.query('DROP TABLE users', (err, res) => {
        if(err) throw err;
        console.log('Users table droped. ', res)
    });

    connection.query(`CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        username VARCHAR(255),
        email VARCHAR(255),
        addressstreet VARCHAR(255),
        addresssuite VARCHAR(255),
        addresscity VARCHAR(255),
        addresszipcode VARCHAR(255),
        addressgeolat VARCHAR(255),
        addressgeolng VARCHAR(255),
        phone VARCHAR(255),
        website VARCHAR(255),
        companyname VARCHAR(255),
        companycatchPhrase  VARCHAR(255),
        companybs VARCHAR(255)
    )`, function(err, result) {
    if (err) throw err
    console.log('Users table created !!');
    users.forEach(user => {
        connection.query('INSERT INTO users (id, name, username, email, addressstreet, addresssuite, addresscity, addresszipcode, addressgeolat, addressgeolng, phone, website, companyname, companycatchPhrase, companybs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [user?.id, user.name, user.username, user.email, user.address?.street, user.address?.suite, user.address?.city, user.address?.zipcode, user.address?.geo?.lat, user.address?.geo?.lng, user.phone, user.website, user.company.name, user.company.catchPhrase, user.company.bs ], function(err, result) {
        if (err) throw err
        });
    });
  });
  isUsersCreated(null);
}


exports.createPosts = (isPostCreated) => {
    if(!connection) return isPostCreated(new Error('Not Connected !!'));

    connection.query('DROP TABLE posts', (err, res) => {
        if(err) throw err;
        console.log('posts table droped. ', res)
    });

    connection.query(`CREATE TABLE IF NOT EXISTS posts (
        id VARCHAR(255) PRIMARY KEY,
        userId VARCHAR(255),
        title VARCHAR(255),
        body VARCHAR(1023)
    )`, function(err, result) {
    if (err) throw err
    console.log('Posts table created !!');
    posts.forEach(post => {
        connection.query('INSERT INTO posts (id, userId, title, body) VALUES (?, ?, ?, ?)', 
        [post?.id, post?.userId, post?.title, post?.body], function(err, result) {
        if (err) throw err
        });
    });
  });
  isPostCreated(null);
}

exports.createComments = (isCommentCreated) => {
    if(!connection) return isCommentCreated(new Error('Not Connected !!'));

    connection.query('DROP TABLE comments', (err, res) => {
        if(err) throw err;
        console.log('comments table droped. ', res)
    });

    connection.query(`CREATE TABLE IF NOT EXISTS comments (
        id VARCHAR(255) PRIMARY KEY,
        postId VARCHAR(255),
        name VARCHAR(255),
        email VARCHAR(255),
        body VARCHAR(1023)
    )`, function(err, result) {
    if (err) throw err
    console.log('comments table created !!');
    comments.forEach(comment => {
        connection.query('INSERT INTO comments (id, postId, name, email, body) VALUES (?, ?, ?, ?, ?)', 
        [comment?.id, comment?.postId, comment?.name, comment?.email, comment?.body], function(err, result) {
        if (err) throw err
        });
    });
  });
  isCommentCreated(null);
}
