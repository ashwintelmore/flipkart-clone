import React from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import HomePage from './containers/HomePage';
import ProductListBySlug from './containers/ProductListBySlug';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:slug"  component={ProductListBySlug} />
        </Switch>
      </Router>
    </div>  
  );
}

export default App;
