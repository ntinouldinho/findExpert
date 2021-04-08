require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const server = http.createServer(app);
const io = socket(server);
const port = process.env.PORT || 8000;



app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/addUser/', async (req, res) => {
    console.log(req.body);
    try {
        const newDoc = await firestore.collection('users').add(req.body);
        res.status(201).send(`Created a new user: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`User should cointain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`)
    }

    
});

  
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBuNVQwF1eRddiz_P8S-2Bzs5aHo-SRnvs",
    authDomain: "professionall.firebaseapp.com",
    projectId: "professionall",
    storageBucket: "professionall.appspot.com",
    messagingSenderId: "628673579093",
    appId: "1:628673579093:web:cbb614b2bf2ed592fc2cdc",
    measurementId: "G-LT02G7RWYZ"
  };

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();


//instead of const rooms we will access firebase and see if in the assigned uuid room someone is currently inside and waiting
//every time a user enters or leaves the room we have to keep a log about his time of arrival and departure from the room
const rooms = {};

io.on("connection", socket => {
    socket.on("profile", profile_id => {
        
        const callDoc = firestore.collection('users').doc(profile_id);
        var doc;
        (async() => {
            doc = await callDoc.get();
        })();

    });

    socket.on("join room", roomID => {

        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);

        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }else{
            socket.emit("no user", doc.data());
        }
    });

    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
});

if(process.env.PROD){
    app.use(express.static(path.join(__dirname,'./client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    })
}


server.listen(port, () => console.log(`server is running on port ${port}`));
