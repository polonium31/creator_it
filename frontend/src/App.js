import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import Routes from './Routes';
const App = (props) => {

  return (
    <>

      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/email-verification" component={Routes.EmailVerify}/>
          <Route exact path="/verification-compelete" component={Routes.VerifiedEmail}/>
          <Route exact path="/forgot-password" component={Routes.ForgotPassword}/>
         
          <PrivateRoute exact path="/" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.Home />
                <Routes.Footer />
              </>
            )
          }} />
          <Route exact path="/profile" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.Profile />
                <Routes.Footer />
              </>
            )
          }} />
          <Route exact path="/reset-password" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.ResetPassword />
                <Routes.Footer />
              </>
            )
          }} />
          <Route exact path="/edit-profile" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.EditProfile />
                <Routes.Footer />
              </>
            )
          }} />
          <Route exact path="/contact-form" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.ContactForm />
                <Routes.Footer />
              </>
            )
          }} />
          <Route exact path="/:Item" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.SubItem />
                <Routes.Footer />
              </>
            )
          }} />
          <Route exact path="/:Item/:Id/:SubItem/:SubId" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.Result />
                <Routes.Footer />
              </>
            )
          }} />
          <Route exact path="/:Item/:Id/:SubItem/:SubId/:Input" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.PrefinalResult/>
                <Routes.Footer />
              </>
            )
          }} />

          <Route exact path="/activate/:Uid/:Token" render={() => {
            return (
              <>
                <Routes.Header />
                <Routes.VerifyUser />
                <Routes.Footer />
              </>
            )
          }} />

          <Redirect to="/" />
          <Route  component={Routes.Error} />
        </Switch>
        
      </AuthProvider>
    </>
  )
}
export default App;
