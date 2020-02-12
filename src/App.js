import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom' 
import MicroFrontend from './Components/MicroFrontend/MicroFrontend'
import Header from './Components/Header/Header'
import About from './Components/About/About'
import './App.css';

function App() {

  const {
    REACT_APP_BROWSE_HOST: browseHost,
    REACT_APP_MOVIE_HOST: movieHost,
  } = process.env;

const Browse = ({ history }) => (
  <MicroFrontend history={history} host={browseHost} name='Browse' />
)

const Movie = ({history}) => (
  <MicroFrontend history={history} host={movieHost} name='Movie' />
)

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Browse} />
        <Route exact path='/movie/:id' component={Movie} />
        <Route exact path='/about' component={About} />
      </Switch>
    </Router>
  );
}

export default App;
