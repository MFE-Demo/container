import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MicroFrontend from "./Components/MicroFrontend/MicroFrontend";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Account from "./Components/Account/Account";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import { connect } from "react-redux";
import { login } from "./Redux/Reducers/authReducer";

import { Auth } from "aws-amplify";
import "./App.css";
const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_MOVIE_HOST: movieHost,
  REACT_APP_REVIEWS_HOST: reviewsHost
} = process.env;

//The purpose of this container application is to provide a shell for our entire app that can dynamically download our micro frontends at runtime and glue them together into something cohesive on a single page.

//All of our apps for our microfrontend make use of React Router for declarative routing. For our container application use a <BrowserRouter> which internally instantiates a history object. We use this object to manipulate the client-side history and also link multiple React apps together. Instead of instantiating history objects for each app, we do it in our main container app and pass it to our micro apps inside. This opens up the door to the ability to pass parameters from one micro app to another via the URL.

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      user: null
    };
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user });
  };

  async componentDidMount() {
    const session = await Auth.currentSession();
    this.setAuthStatus(true);
    console.log(session);
    const user = await Auth.currentAuthenticatedUser();
    if (user && user.username) {
      this.setUser(user);
      this.props.login(user);
      console.log("login fired");
    }
    console.log(user);
  }

  //Predefining our microfrontend components or "micro apps". We will render these micro apps using their name, history object and the host where its bundle can be downloaded.

  Browse = ({ history }) => (
    <MicroFrontend history={history} host={browseHost} name="Browse" />
  );

  Movie = ({ history }) => (
    <MicroFrontend history={history} host={movieHost} name="Movie" />
  );

  Reviews = ({ history }) => (
    <MicroFrontend history={history} host={reviewsHost} name="Reviews" />
  );

  render() {
    const { user } = this.props.user;
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={this.Browse} />
          <Route exact path="/movie/:id" component={this.Movie} />
          {/* <Route exact path="/movie/:id" component={Reviews} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot" component={ForgotPassword} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps, { login })(App);
