const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv")
env.config()

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_connection);
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

const app = express();


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;
    const phone = req.body.phone;

    const data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('signup_success.html');
})


app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");