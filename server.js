//npm install express mongoose ejs dotenv
// npm install --save-dev nodemon

//"start": "nodemon server.js"

//Declaring variables
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
// const mongoose = require("mongoose");
require('dotenv').config()
const PORT = 8000;

//Set middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

// const cors = require('cors');
// const bodyParser = require('body-parser');
// app.use(cors());
// app.use(bodyParser.urlencoded({extend:true}));


// mongoose.connect('string', (err, client) => {})
MongoClient.connect(process.env.DB_CONNECTION,
    {useNewURLParser: true},
    (err, client) => {
    // if (err) return console.error(err);
	console.log('connected to database');
    // const db = client.db('thinkingthings-journalentries');
});

app.listen(PORT, ()=> {
    console.log(`The server is running on ${PORT}`);
});


// app.get('/', (request, response) => {
//     db.collection('posts').find().toArray()
//     //promise gives us an array of objects, that 'data' (below) is holding the resulting array
//     .then(data => {
//         response.render('index.ejs', {info: data});
//     })
//     .catch(error => console.error(error));
// })

// app.post('/addEntry', (request, response) => {
//     db.collection('posts').insertOne({thought: request.body.thought, signoff: request.body.signoff, likes: 0})
//     .then(result => {
//         console.log('a thought was thought');
//         response.redirect('/');
//     })
//     .catch(error => console.error(error));
// })

// app.get('/api:name', (request, response) => {
//     const rapperName = request.params.name.toLowerCase();
//     if (rappers[rapperName]) {
//         response.json(rappers[rapperName]);
//     } else {
//         response.json(rappers[unknown]);
//     }
// })

