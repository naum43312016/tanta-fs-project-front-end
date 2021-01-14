import React, { useContext, useState } from 'react';
import { Row, Button, Modal } from 'reactstrap';
import { Authentication } from '../../contexts/Authentication';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import SignUp from '../LoginPage/SignUp';
import Login from '../LoginPage/Login';

const TopNavBar = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);

    return (
        <div>
            <Row className="top-navbar">
                <h3 className="col-3 logo offset-1 mt-2 pl-5">Tanta</h3>
                <Row className="col-6 justify-content-end ml-3">
                    <Link to="/login">
                        <Button color="primary" className="nav-button rounded" onClick={() => setOpenLogin(true)}>Login/Signup</Button>
                    </Link>
                </Row>
                <FontAwesomeIcon style={{ height: "24px", color: "white" }} icon={faUser} className="col-1"></FontAwesomeIcon>
            </Row>
            <Modal isOpen={openLogin} className="login-modal">
                <Route path="/login">
                    <Login setOpenLogin={(bool) => setOpenLogin(bool)} setOpenSignup={(bool) => setOpenSignup(bool)} />
                </Route>
            </Modal>
            <Modal isOpen={openSignup} className="signup-modal">
                <SignUp setOpenSignup={(bool) => setOpenSignup(bool)} setOpenLogin={(bool) => setOpenLogin(bool)} />
            </Modal>
        </div>
    )
}

export default TopNavBar;