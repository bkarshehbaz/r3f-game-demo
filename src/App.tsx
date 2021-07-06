/* eslint-disable */ 
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import BitArcade from "../src/bitArcade/play";
import { Join, Chat } from "./components";

import Start from "./components/pages/Start";
import Board from "./components/pages/Board";

// import "./index.css";



// import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {

  componentDidMount () {
    const script = document.createElement("script");
    script.src = "./functions.js";
    script.async = true;
    document.body.appendChild(script);
}

  render() {
    console.log("window",window)
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/bitarcade" component={BitArcade} />
              <Route path="/chat" component={Chat} />
              <Route path="/join" exact component={Join} />
              <Route path="/start" exact component={Start} />
              <Route path="/game" component={Board} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
