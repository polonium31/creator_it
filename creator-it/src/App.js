import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Switch,Route, Redirect } from 'react-router-dom';
import {Login} from "./components/Login";
import {SignUp} from "./components/SignUp";
import { Header } from './components/Header'
import {Home} from "./components/Home";
import {Profile} from "./components/Profile";
import {SubItem} from "./components/SubItem";
import {Result} from "./components/Result";
import {ResetPassword} from "./components/ResetPassword";
import {EditProfile} from "./components/EditProfile";
import {Footer} from "./components/Footer";
const App = () => {
  return ( 
    <>
   
    <Header/>
    <Switch>

      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/reset-password" component={ResetPassword}/>
      <Route exact path="/edit-profile" component={EditProfile}/>
      <Route exact path="/:Item" component={SubItem}/>
      <Route exact path="/:Item/:Id/:SubItem/:SubId" component={Result}/>
      <Redirect to="/"/>
    </Switch>
    <Footer/>
    </>
  )
}
export  default App;
