import React, { useState, useEffect } from 'react';
import { Authentication } from '../../Contexts/Authentication';
import { UserCoins } from '../../Contexts/UserCoins'
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../HomePage/Home/Home';
import ProfileSettings from '../Profile/ProfileSettings/ProfileSettings';
import TopNavBar from '../NavBars/NavBars/TopNavBar';
import MyItems from '../Profile/MyItems/MyItems'
import AddItem from '../ItemPage/AddItem/AddItem'
import ItemPage from '../ItemPage/ItemPage/ItemPage';
import axios from 'axios';
import BASE_URL from '../../Tools/URLs';
import '../../Styles/App.css';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [userCoins, setUserCoins] = useState(0)
  const token = localStorage.getItem('token') || null
  const sessionID = localStorage.getItem('sessionID')

  const updateCoins = async () => {
    await axios.get(`${BASE_URL}/user/${sessionID}`)
    .then(res => {
        setUserCoins(res.data.coins)
    })
  }

  useEffect(() => {
    if(token) setAuthenticated(true)
    axios.get(`${BASE_URL}/user/${sessionID}`)
    .then(res => {
        setUserCoins(res.data.coins)
    })
    .catch(err=>console.error(err))
  }, [token, userCoins])

  return (
    <Container fluid>
      <Authentication.Provider value={{ authenticated, setAuthenticated }}>
        <UserCoins.Provider value={{userCoins, setUserCoins, updateCoins }}>
        <Router>
          <TopNavBar coins={userCoins && userCoins}/>
          <Switch>
              <Route path="/add-item" component={AddItem}/>
              <Route path="/my-items" component={MyItems}/>
              <Route path="/settings" component={ProfileSettings} />
              <Route path="/item/:id">
                <ItemPage coins={userCoins} setUserCoins={setUserCoins}/>  
              </Route>
              <Route path="/" component={Home} />
          </Switch>
        </Router>
        </UserCoins.Provider>
      </Authentication.Provider>
    </Container>
  );
}

export default App;
