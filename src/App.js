import React, { useState, useEffect } from 'react';
import { Authentication } from './contexts/Authentication';
import { Container, Navbar } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import './styles/App.css';
import Home from './Components/HomePage/Home';
import ProfileSettings from './Components/Profile/ProfileSettings';
import TopNavBar from './Components/NavBars/TopNavBar';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminConfirmation, setAdminConfirmation] = useState(false);

  return (
    <Container fluid>
      <Router>
        <TopNavBar />
        <Authentication.Provider value={{ authenticated, setAuthenticated }}>
          <Switch>
            <Route path="/home" component={Home} />
          </Switch>
          <Switch>
            <Route path="/settings" component={ProfileSettings} />
          </Switch>
        </Authentication.Provider>
      </Router>
    </Container>
  );
}

export default App;
