import React, {useEffect} from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {useDispatch , useSelector} from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './containers/Home/index'
import Signup from './containers/Signup/index'
import Signin from './containers/Signin/index'
import PrivateRouter from "./HOC/PrivateRouter";
import { allCategoryData, getAllInitialData, isUserLogined} from './actions'
import ProductPage from "./containers/Products";
import OrderPage from "./containers/Orders";
import Category from "./containers/Category";

// import Bootstrap from "bootstrap"
// import { Button, Navbar, Nav, NavDropdown, Container, Jumbotron } from "react-bootstrap";





function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    //console.log.log(auth.authenticate);
    if (!auth.authenticate) {//true
      //console.log.log(auth.authenticate);
      dispatch(isUserLogined())
    }
    dispatch(allCategoryData());
    dispatch(getAllInitialData());
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRouter exact path="/" component={Home} ></PrivateRouter>
        <PrivateRouter  path="/category" component={Category} ></PrivateRouter>
        <PrivateRouter  path="/products" component={ProductPage} ></PrivateRouter>
        <PrivateRouter  path="/order" component={OrderPage} ></PrivateRouter>
        
          <Route path="/signup" component={Signup} ></Route>
          <Route path="/signin" component={Signin} ></Route>
      </Switch>
    </div>
  );
}

export default App;
