import React from 'react';
import { Giphy } from './features/giphy/Giphy';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import {GiphyFavorites} from "./features/giphy/GiphyFavorites";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <Giphy/>
              </React.Fragment>
            )}
          />
          <Route exact path="/favorites" component={GiphyFavorites} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
