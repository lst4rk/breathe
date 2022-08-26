//npm install express mongoose ejs dotenv
// npm install --save-dev nodemon

//"start": "nodemon server.js"

//Declaring variables
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
require('dotenv').config()

// const cors = require('cors');
// const bodyParser = require('body-parser');
// app.use(cors());
// app.use(bodyParser.urlencoded({extend:true}));

let db,
    db_ConnectionStr = process.env.DB_CONNECTION
    dbName = 'thinkingthings-journalentries'

MongoClient.connect(db_ConnectionStr,
    {useNewURLParser: true},
    (err, client) => {
    if (err) return console.error(err);
	console.log('connected to database');
    db = client.db(dbName);
    // const db = client.db('thinkingthings-journalentries');
});

//Set middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.listen(process.env.PORT || PORT, ()=> {
    console.log(`The server is running on ${PORT}`);
});


app.get('/', (request, response) => {
    db.collection('posts').find().sort({likes: -1}).toArray()
    //promise gives us an array of objects, that 'data' (below) is holding the resulting array
    .then(data => {
        response.render('index.ejs', {info: data});
    })
    .catch(error => console.error(error));
})

app.post('/addEntry', (request, response) => {
    db.collection('posts').insertOne({thought: request.body.thought, signoff: request.body.signoff, likes: 0})
    .then(result => {
        console.log('a thought was thought');
        response.redirect('/');
    })
    .catch(error => console.error(error));
})

app.put('/addOneLike', (request, response) => {
    db.collection('posts').updateOne({thought: request.body.thoughtS, signoff: request.body.signoffS, likes: request.body.likesS}, {
        $set: {
            likes: request.body.likesS + 1
        }
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added one like');
        response.json('like added');
    })
    .catch(error => console.error(error));
})

app.delete('deleteEntry', (request, response) => {
    db.collection('posts').deleteOne({thought: request.body.thoughtS})
    .then(result => {
        console.log('a thought was taken back');
        response.json('a thought was taken back');
    })
    .catch(error => console.error(error));
})

// app.get('/api:name', (request, response) => {
//     const rapperName = request.params.name.toLowerCase();
//     if (rappers[rapperName]) {
//         response.json(rappers[rapperName]);
//     } else {
//         response.json(rappers[unknown]);
//     }
// })

