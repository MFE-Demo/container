import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import MicroFrontend from "./Components/MicroFrontend/MicroFrontend";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Login from "./Components/Auth/Login";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import "./App.css";
// import { withAuthenticator } from "aws-amplify-react";
// Amplify.configure(aws_exports);
// import {App as FlixFinder} from 'flixfinder'

function App() {
  const {
    REACT_APP_BROWSE_HOST: browseHost,
    REACT_APP_MOVIE_HOST: movieHost
  } = process.env;

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
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
