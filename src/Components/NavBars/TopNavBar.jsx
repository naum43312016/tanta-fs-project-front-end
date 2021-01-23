import React, { useContext, useEffect, useState } from 'react';
import { Row, Button, Modal } from 'reactstrap';
import { Authentication } from '../../Contexts/Authentication';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faCoins, faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import SignUp from '../LoginPage/SignUp';
import Login from '../LoginPage/Login';
import { confirmLogout } from '../../Tools/WebsiteResponses';
import axios from 'axios';
import BASE_URL from '../../Tools/URLs';

const TopNavBar = (props) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const [userCoins, setUserCoins] = useState(null);
    const { authenticated, setAuthenticated } = useContext(Authentication)
    const sessionID = localStorage.getItem('sessionID')

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${sessionID}`)
        .then(res => res.data)
        .then(res => setUserCoins(res.coins))
        .catch(err=>console.error(err))
    }, [])
    return (
        <>
            <Row className="top-navbar">
                <Link style={{textDecoration:"none"}} className="offset-1 col-4 tanta-logo" to='/'>
                    <h3 className="logo mt-2 pl-2">Tanta</h3>
                </Link>
                {authenticated ?
                    <>   
                        <div style={{marginRight: '10px'}}> 
                            <span style={{ color: "white", fontWeight:"500",fontSize: "20px"}}>{userCoins && userCoins}</span> <FontAwesomeIcon style={{ color: "#ffd700", height: "25px"}} icon={faCoins} size="2x"></FontAwesomeIcon>
                        </div>
                        <Link to={"/"}>
                            <FontAwesomeIcon style={{ color: "white", height: "25px" }} icon={faHome} size="2x" ></FontAwesomeIcon>
                        </Link>
                        <Link to={"/add-item"}>
                            <FontAwesomeIcon style={{ color: "white", height: "25px" }} icon={faPlus} size="2x" ></FontAwesomeIcon>
                        </Link>
                        <Link to={"/my-items"}>
                            <FontAwesomeIcon style={{ color: "white", height: "25px" }} icon={faUser} size="2x" ></FontAwesomeIcon>
                        </Link>
                        <Link to="/settings">
                            <FontAwesomeIcon style={{ color: "white", height: "25px" }} icon={faCog} size="2x"></FontAwesomeIcon>
                        </Link>                       
                        <Button onClick={() => confirmLogout(setAuthenticated, setOpenSignup)} color="light" className="nav-button rounded">Logout</Button>
                    </>
                    :
                    <>
                        <Link to="/login">
                            <Button color="light" className="nav-button rounded" onClick={() => setOpenLogin(true)}>Login/Signup</Button>
                        </Link>
                        <Modal isOpen={openLogin} className="login-modal">
                            <Route path="/login">
                                <Login setOpenLogin={(bool) => setOpenLogin(bool)} setOpenSignup={(bool) => setOpenSignup(bool)} />
                            </Route>
                        </Modal>
                        <Modal isOpen={openSignup} className="signup-modal">
                            <SignUp setOpenSignup={(bool) => setOpenSignup(bool)} setOpenLogin={(bool) => setOpenLogin(bool)} />
                        </Modal>
                    </>
                }
            </Row>
            <Row style={{ backgroundColor: "#7AE582", height: "30px" }} />
            </>
    )
}

export default TopNavBar;