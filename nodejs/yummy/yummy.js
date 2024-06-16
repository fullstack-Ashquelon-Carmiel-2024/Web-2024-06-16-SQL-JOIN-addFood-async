const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('ejs');
const fileUpload = require('express-fileupload');

const home = require('./model/home');
const food = require('./model/food');

/********** VARIABLES **********/
// CHOICE OPERATOR || - if we've got a value we use it, if not we want it to be 3053
let port = process.env.PORT || 3053;

/*********** DB CONNECTION **********/
const db = mysql.createConnection({
    host: 'localhost', // or '127.0.0.1'
    port: 3306,
    database: 'yummy',
    user: 'root', // TBD: create new, less powerful user
    password: ''
})

db.connect(err => {

    if (err) {
        // Connection to DB is critical for our app,
        // so if it has failed, we should treat it 
        // and not start the server
        throw(err)
    }

    console.log('I fill lucky today. I\'ve connected to DB!!!');

})

global.db = db;

/***** CREATE THE SERVER ******/
const app = express();

/***** VARIABLES OF EXPRESS ******/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

/******* MIDDLEWARE *********/
app.use(express.static(path.join(__dirname,'static')));

app.use(express.urlencoded({extended:true})); // if we've got form data, converts it to json
app.use(express.json());// converts json into object

app.use(fileUpload());

/******* ROUTING *********/
// GET - HTTP method, that asks to bring some
// data or page, sometimes, in accordance to parameters
app.get('/',home.getHomePage);

app.get('/add',food.getAddPage);
app.post('/add',food.addFood);

/*********LISTENER *********/
app.listen(port, () => {

    console.log(`Listening on the port ${port}`)

})