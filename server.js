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

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");


var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "professionall.firebaseapp.com",
    projectId: "professionall",
    storageBucket: "professionall.appspot.com",
    messagingSenderId: "628673579093",
    appId: "1:628673579093:web:cbb614b2bf2ed592fc2cdc",
    measurementId: "G-LT02G7RWYZ"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// var mailOptions = {
//     from: process.env.EMAIL,
//     to: customer.email,
//     subject: 'Video chat link',
//     text: 'Your link is...'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

app.post('/api/reset/', async(req, res) => {
    console.log(req.body);

    firebase.auth().sendPasswordResetEmail(
            req.body.email)
        .then(function() {
            console.log("sent");
        })
        .catch(function(error) {
            console.log(error);
        });

});


app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/register/', async(req, res) => {
    console.log(req.body);

    //const newDoc = await firestore.collection('users').add(req.body);
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user.uid;

            firestore.collection('users').doc(user).set({
                name: req.body.name
            })

            //const newDoc = await firestore.collection('users').add(req.body)
            res.status(201).send(`Created a new user: ${user}`);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            res.status(400).send(`${errorMessage} and ${errorCode}`);
        });

});

app.get('/api/expert/get', async(req, res) => {
    const callDoc = firestore.collection('experts').doc('uDOmxlKpwHvQaJ0N1Dds');
     var doc = await callDoc.get();
     console.log(doc.data());
    res.status(201).send(doc.data());
});


app.post('/api/user/edit', async(req, res) => {
    const user = db.collection('users').doc(req.body.id);

     res = await user.update({name: req.body.name});

});

app.post('/api/expert/edit', async(req, res) => {
    const expert = db.collection('experts').doc(req.body.id);

     res = await expert.update({name: req.body.name});

});


app.post('/api/login/', async(req, res) => {
    console.log(req.body);

    //const newDoc = await firestore.collection('users').add(req.body);
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;

            res.status(201).send(`Logged in: ${user}`);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            res.status(400).send(`${errorMessage} and ${errorCode}`);
        });

});




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
        } else {
            socket.emit("no user", "23");
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

if (process.env.PROD) {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    })
}


server.listen(port, () => console.log(`🚀🚀🚀🚀🚀server is running on port🚀🚀🚀 ${process.env.EMAIL}`));