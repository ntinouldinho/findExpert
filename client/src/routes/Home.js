import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import '../CSS/Home.css';

function Home(){

    function videoChat() {
        window.location.replace("createroom");
    }

    return(
        <button onClick={videoChat}>Video Chat</button>
    );
        
    
}

export default Home;