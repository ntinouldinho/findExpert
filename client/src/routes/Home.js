import React from 'react';
// import HomeCategory from '../components/HomeCategory';
import { HomeCategory } from "../components/HomeCategory";
import '../CSS/Home.css';

function Home(){

    function videoChat() {
        window.location.replace("createroom");
    }

    return(
       <HomeCategory name = "Mechanic" image = "../assets/mechanic-school.jpg"/>
    );
        
    
}

export default Home;