import React, { useContext, useState } from 'react';
import { Row, Button, Modal } from 'reactstrap';
import { Authentication } from '../../Contexts/Authentication';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons'
import SignUp from '../LoginPage/SignUp';
import Login from '../LoginPage/Login';
import { confirmLogout } from '../../Tools/WebsiteResponses';

const TopNavBar = (props) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const { authenticated, setAuthenticated } = useContext(Authentication)

    return (
        <div>
            <Row className="top-navbar">
                <Link to='/' style={{ textDecoration: "none" }}>
                    <h3 className="col-3 logo offset-1 mt-2 pl-5">Tanta</h3>
                </Link>
                {!authenticated &&
                    <Link to="/login">
                        <Button color="light" className="nav-button rounded" onClick={() => setOpenLogin(true)}>Login/Signup</Button>
                    </Link>
                }
                {authenticated &&
                    <>

                        <Link to={"/my-items"}>
                            <FontAwesomeIcon style={{ color: "white", height: "25px" }} icon={faUser} size="2x" ></FontAwesomeIcon>
                        </Link>
                        <Link to="/settings">
                            <FontAwesomeIcon style={{ color: "white", height: "25px" }} icon={faCog} size="2x"></FontAwesomeIcon>
                        </Link>
                        <Button onClick={() => confirmLogout(setAuthenticated, setOpenSignup)} color="light" className="nav-button rounded" >Logout</Button>
                    </>
                }
            </Row>
            {!authenticated &&
                <>
                    <Modal isOpen={openLogin} className="login-modal">
                        <Route path="/login">
                            <Login setOpenLogin={(bool) => setOpenLogin(bool)} setOpenSignup={(bool) => setOpenSignup(bool)} />
                        </Route>
                    </Modal>
                    <Modal isOpen={openSignup} className="signup-modal">
                        <SignUp setOpenSignup={(bool) => setOpenSignup(bool)} setOpenLogin={(bool) => setOpenLogin(bool)} />
                    </Modal>
                </>}
        </div>
    )
}

export default TopNavBar;