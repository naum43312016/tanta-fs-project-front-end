import React, { useContext, useState } from 'react';
import { Row, Button, Modal } from 'reactstrap';
import { Authentication } from '../../Contexts/Authentication';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons'
import SignUp from '../LoginPage/SignUp';
import Login from '../LoginPage/Login';
import Logout from '../LoginPage/Logout'
import { ReactModal } from 'react-modal';




const TopNavBar = (props) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const { authenticated, setAuthenticated } = useContext(Authentication)
    
    const handleLogout = () => {
        setOpenLogout(false)
        setOpenLogin(false);
        setOpenSignup(false);
        setAuthenticated(false)
        localStorage.clear()
    }
  
    return (
        <div>
            <Row className="top-navbar">
                <Link to='/' style={{textDecoration:"none"}}>
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
            <FontAwesomeIcon style={{ color: "white" }} icon={faUser}  size="2x" ></FontAwesomeIcon>
            </Link>
            <Link to="/settings">
            <FontAwesomeIcon style={{color: "white" }} icon={faCog} size="2x"></FontAwesomeIcon>
            </Link>
            <Button onClick={()=>setOpenLogout(true)} color="light" className="nav-button rounded" >Logout</Button>
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
            <Modal isOpen={openLogout} className="login-modal">
                        <Logout setOpenLogout={(bool) => setOpenLogout(bool)} handleLogout={handleLogout} />
            </Modal>
        </div>
    )
}

export default TopNavBar;