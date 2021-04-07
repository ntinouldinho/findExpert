import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Home} from "./routes/Home";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import {Results} from "./routes/Results";
import './CSS/App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createroom" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/search/:search" component={Results} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
