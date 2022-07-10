import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

import { Header } from './components/Header';
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { SubItem } from "./components/SubItem";
import { Result } from "./components/Result";
import { VerifyUser } from "./components/VerifyUser";
import { EmailVerify } from "./components/EmailVerify";
import { VerifiedEmail }  from "./components/VerifiedEmail";
import { ResetPassword } from "./components/ResetPassword";
import { EditProfile } from "./components/EditProfile";
import { Footer } from "./components/Footer";
const App = (props) => {

  return (
    <>

      <AuthProvider>

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/email-verification" component={EmailVerify}/>
          <Route exact path="/verification-compelete" component={VerifiedEmail}/>
         
          <PrivateRoute exact path="/" render={() => {
            return (
              <>
                <Header />
                <Home />
              </>
            )
          }} />
          <Route exact path="/profile" render={() => {
            return (
              <>
                <Header />
                <Profile />
              </>
            )
          }} />
          <Route exact path="/reset-password" render={() => {
            return (
              <>
                <Header />
                <ResetPassword />
              </>
            )
          }} />
          <Route exact path="/edit-profile" render={() => {
            return (
              <>
                <Header />
                <EditProfile />
              </>
            )
          }} />
          <Route exact path="/:Item" render={() => {
            return (
              <>
                <Header />
                <SubItem />
              </>
            )
          }} />
          <Route exact path="/:Item/:Id/:SubItem/:SubId" render={() => {
            return (
              <>
                <Header />
                <Result />
              </>
            )
          }} />

          <Route exact path="/activate/:Uid/:Token" render={() => {
            return (
              <>
                <Header />
                <VerifyUser />
              </>
            )
          }} />

          <Redirect to="/" />
        </Switch>
        <Footer />
      </AuthProvider>
    </>
  )
}
export default App;
