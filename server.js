const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({extend:true}));

// const rappers = {
//     'birthName': 'hi',
//     'birthLocation': 'hiii',
//     'age': '21' 
// }

MongoClient.connect('mongodb+srv://lst4rk:Hairsty1es@cluster0.zrrjjqf.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
	console.log('connected to database');
})

app.get('/', (request, response) => {
    response.sendFile(__dirname + 'index.html');
})

// app.get('/api:name', (request, response) => {
//     const rapperName = request.params.name.toLowerCase();
//     if (rappers[rapperName]) {
//         response.json(rappers[rapperName]);
//     } else {
//         response.json(rappers[unknown]);
//     }
// })

app.listen(PORT, ()=> {
    console.log(`The server is running on ${PORT}`);
})