require("dotenv").config();
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const bodyParser = require('body-parser');
const path = require("path");
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const crypto = require("crypto");
const cookieParser = require('cookie-parser');

const withAuth = require('./middleware');


const secret = process.env.SECRET;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

// var transporter = nodemailer.createTransport({
//     service: 'hotmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// }); 

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

app.post('/api/login/', async(req, res) => {
    console.log(req.body);

    var theUser = {};
    //const newDoc = await firestore.collection('users').add(req.body);
    await firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            // Signed in 
            theUser = userCredential;

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            res.status(400).send(`${errorMessage} and ${errorCode}`);
        });

    console.log(theUser);
    var email = theUser.user.email;
    var user = theUser.user.uid;

    const callDoc = firestore.collection('users').doc(user);
    var doc = await callDoc.get();
    var user_data = doc.data();

    const payload = { email: email, user: user, role: user_data.role };
    const token = jwt.sign(payload, secret, {
        expiresIn: '24h'
    });
    res.cookie('token', token, { httpOnly: true })
        .sendStatus(200);

});

app.get('/logout', function(req, res) {
    res.cookie('token', null, { maxAge: 0 })
        .sendStatus(200);
});

app.get('/api/decode/', async(req, res) => {
    const token = req.cookies.token;
    console.log(token);
    var decoded = jwt_decode(token, process.env.SECRET);
    console.log(jwt_decode(token, process.env.SECRET));
    res.status(201).send(decoded);

});


app.post('/api/register/', async(req, res) => {
    //const newDoc = await firestore.collection('users').add(req.body);
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user.uid;
            var email = userCredential.user.email;

            firestore.collection('users').doc(user).set({
                name: req.body.name,
                appointments: [],
                role: 'user',
                email: email
            })



            const payload = { email };
            const token = jwt.sign(payload, secret, {
                expiresIn: '24h'
            });
            res.cookie('token', token, { httpOnly: true })
                .sendStatus(200);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            res.status(400).send(`${errorMessage} and ${errorCode}`);
        });

});


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


app.post('/api/appointment/create', async(req, res) => {

    //create email to inform expert that he has a new appointment pending

    const appointment = {
        customer: req.body.customer,
        expert: "HVp43gujF3Ssoor8t4hGN5jA1w33",
        uuid: crypto.randomBytes(16).toString("hex"),
        status: 0
    };

    const newDoc = await firestore.collection('appointments').add(appointment);

    const app_id = newDoc.id;

    firestore.collection('users').doc(appointment.customer).update({
        appointments: firebase.firestore.FieldValue.arrayUnion(app_id)
    })

    firestore.collection('users').doc(appointment.expert).update({
        appointments: firebase.firestore.FieldValue.arrayUnion(app_id)
    })
    res.status(200).send("ok");
});



app.get('/api/user/get', async(req, res) => {
    let user = req.query.user || req.body.user;
    const callDoc = firestore.collection('users').doc(user);
    var doc = await callDoc.get();

    var data = doc.data();

    let appointments = data.appointments;
    const fullAppointments = [];

    for (var i = 0; i < appointments.length; i++) {

        const appointment = firestore.collection('appointments').doc(appointments[i]);
        var appointment_data = await appointment.get();

        var theData = appointment_data.data();

        theData.appointment_id = appointments[i]

        console.log(theData)



        const expert = firestore.collection('users').doc(theData.expert);
        var expert_data = await expert.get();
        expert_data = expert_data.data();
        theData.expert_name = expert_data.name + " " + expert_data.surname

        console.log(expert_data)

        const customer = firestore.collection('users').doc(theData.customer);
        var customer_data = await customer.get();
        customer_data = customer_data.data();

        console.log(customer_data)
        theData.customer_name = customer_data.name;
        //get experts name 
        fullAppointments.push(theData);

    }

    data.appointments = fullAppointments;

    res.status(201).send(data);
});


app.post('/api/appointment/approve/', async(req, res) => {

    firestore.collection('appointments').doc(req.body.id).update({
        status: 1
    })
    res.status(200).send("ok");

});



app.get('/api/expert/getAppointment', async(req, res) => {
    const callDoc = firestore.collection('users').doc('uDOmxlKpwHvQaJ0N1Dds');
    var doc = await callDoc.get();
    console.log(doc.data());
    res.status(201).send(doc.data());
});


app.post('/api/user/edit', async(req, res) => {
    const user = db.collection('users').doc(req.body.id);

    res = await user.update({ name: req.body.name });

});

app.post('/api/expert/edit', async(req, res) => {
    const expert = db.collection('users').doc(req.body.id);

    res = await expert.update({ name: req.body.name });

});






//instead of const rooms we will access firebase and see if in the assigned uuid room someone is currently inside and waiting
//every time a user enters or leaves the room we have to keep a log about his time of arrival and departure from the room
const rooms = {};
const chats = {};

io.on("connection", socket => {

    socket.on("profile", profile_id => {

        const callDoc = firestore.collection('users').doc(profile_id);
        var doc;
        (async() => {
            doc = await callDoc.get();
        })();

    });

    socket.on("join room", roomID => {
        console.log("the socket is:"+socket.id)
        console.log(rooms[roomID])
        
        if (rooms[roomID]) {
            const me = rooms[roomID].find(id => id === socket.id);
            if(!me) rooms[roomID].push(socket.id);
            
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

    socket.on("join chat", roomID => {

        if (chats[roomID]) {
            chats[roomID].push(socket.id);
        } else {
            chats[roomID] = [socket.id];
        }
        const otherUser = chats[roomID].find(id => id !== socket.id);

        if (otherUser) {
            socket.emit("other user chat", otherUser);
            socket.to(otherUser).emit("user joined chat", socket.id);
        }
        socket.emit("your id", socket.id);

    });

    socket.on("send message", body => {
        io.emit("message", body)
    })

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