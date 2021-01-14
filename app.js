const express = require('express');
const app = express();
const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

//Listening at or running at
const server = app.listen(3000, ()=>{
	console.log("Server running at port 3000");
});

//Connection for the MONGODB database
//mongoose.connect("<Your db>", { useNewUrlParser: true, useUnifiedTopology: true });


//Creating the collections into the database

//USER COLLECTION CREATED, this is for your reference
const { userCollectionSchema } = require('./schema/usercollection');
const user = mongoose.model("user", userCollectionSchema);


//Create your Schemas here



///////////////////////////////////////////////////////////////////
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());



//Index route
app.get("/",(req,res)=>{
	res.render("index.html");
});

//Socket Setup
const io = socket(server);

io.on('connection', (socket)=>{
	console.log("made socket connection", socket.id);
	// Handle chat event
	socket.on('chat', (data)=>{
			io.sockets.emit('chat',data);
	});

	// Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});

//Write the routes here
//Implement the RESTFul routes responding to with status along with the data
//Or get the data and store it in your created collection in the database.
//Make a dummy collection of your own so that it can be used as an dummy datasets.
