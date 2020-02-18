import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MicroFrontend from "./Components/MicroFrontend/MicroFrontend";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import "./App.css";

//The purpose of this container application is to provide a shell for our entire app that can dynamically download our micro frontends at runtime and glue them together into something cohesive on a single page.

//All of our apps for our microfrontend make use of React Router for declarative routing. For our container application use a <BrowserRouter> which internally instantiates a history object. We use this object to manipulate the client-side history and also link multiple React apps together. Instead of instantiating history objects for each app, we do it in our main container app and pass it to our micro apps inside. This opens up the door to the ability to pass parameters from one micro app to another via the URL.

function App() {
  const {
    REACT_APP_BROWSE_HOST: browseHost,
    REACT_APP_MOVIE_HOST: movieHost
  } = process.env;

  //Predefining our microfrontend components or "micro apps". We will render these micro apps using their name, history object and the host where its bundle can be downloaded.

  const Browse = ({ history }) => (
    <MicroFrontend history={history} host={browseHost} name="Browse" />
  );

  const Movie = ({ history }) => (
    <MicroFrontend history={history} host={movieHost} name="Movie" />
  );
  console.log(browseHost);
  console.log(window);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Browse} />
        <Route exact path="/movie/:id" component={Movie} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
