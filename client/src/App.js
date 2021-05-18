import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Home} from "./routes/Home";
import withAuth from './routes/Authenticate';
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import {Results} from "./routes/Results";
import {Login} from "./routes/Login";
import {EditProfile} from "./routes/EditProfile";
import {Profile} from "./routes/Profile";
import {User} from "./routes/User";
import './CSS/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createroom" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
          <Route path="/search/:search" component={Results} />
          <Route path="/login" component={Login} />
          <Route path="/profile/:name/:id" component={Profile} />
          <Route path="/user" component={withAuth(User)} />
          <Route path="/profile/edit" component={withAuth(EditProfile)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
