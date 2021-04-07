import React from 'react';
// import HomeCategory from '../components/HomeCategory';
import { HomeCategory } from "../components/HomeCategory";
import '../CSS/Home.css';

function Home(){

    return(
        <div className="HomeCategories">
            <HomeCategory name = "Mechanic"/>
            <HomeCategory name = "Mechanic"/>
            <HomeCategory name = "Mechanic"/>
        </div>
    );
        
    
}

export default Home;