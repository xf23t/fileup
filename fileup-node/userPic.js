// code from https://github.com/codeforgeek/File-upload-in-Node/
// Tutorial link : http://wp.me/p4ISPV-cq
var express = require('express');
var multer = require('multer');
var mysql = require('mysql');
var app = express();
var connection = mysql.createConnection({

    'host': 'aws-rds-my-sql.czyy7a7mm4rr.us-west-2.rds.amazonaws.com',
    'user': 'user',
    'password': 'password',
    'database': 'board',
});

var abc = true;
var done = false;

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}).single('singleInputFileName'));

/*
app.get('/', function (req, res) {
    res.sendfile('index.html');
});*/

app.post('/photo', function (req, res, next) {
    if (done == true) {
        console.log(req.files);
        res.end("File uploaded.\n" + JSON.stringify(req.files));

        connection.query('update user set user_pic = ? where user_idx = ? ;', [ abc, req.body.user_idx]);
    }
});

module.exports = router;