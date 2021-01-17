import React, { useState, useEffect } from 'react';
import { Authentication } from './Contexts/Authentication';
import { Container, Navbar } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Styles/App.css';
import Home from './Components/HomePage/Home';
import ProfileSettings from './Components/Profile/ProfileSettings';
import TopNavBar from './Components/NavBars/TopNavBar';
import MyItems from './Components/Profile/MyItems'
import ItemPage from './Components/ItemPage/ItemPage';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false); // true just for now
  const [adminConfirmation, setAdminConfirmation] = useState(false);
  const token = localStorage.getItem('token') || null

  useEffect(() => {
    if(token) {
      setAuthenticated(true)
    }
  }, [token])

  return (
    <Container fluid>
      <Authentication.Provider value={{ authenticated, setAuthenticated }}>
        <Router>
          <TopNavBar />
          <Switch>
              <Route path="/my-items" component={MyItems}/>
              <Route path="/settings" component={ProfileSettings} />
              <Route path="/item/:id" component={ItemPage} />
              <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Authentication.Provider>
    </Container>
  );
}

export default App;
