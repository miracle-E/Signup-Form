var express = require("express");
var bodyParser = require("body-parser");
// var port =  process.env.PORT|| 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection errror"));
db.once('open', function(callback){
    console.log('connection succeeded');
});

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name": name,
        "email": email,
        "password":password,
        "phone": phone
    };
     db.collection('details').insertOne(data, function(err, collection){
         if(err) throw err;
         console.log("record inserted successfully");
     });
     return res.redirect('signup_success.html')
});

app.get('/', function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3000);



// app.listen(port);



