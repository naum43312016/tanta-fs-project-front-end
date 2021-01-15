import { Container, Button, ModalHeader, ModalBody, ModalFooter, Row } from "reactstrap";
import { Link, Router } from "react-router-dom";

const Logout = (props) => {
    return  (
     <Container>
        <Row className="d-flex justify-content-end">
            <Button color="danger mr-3 mt-3" onClick={() => props.setOpenLogout(false)}>
            X
        </Button>
        </Row>
        <ModalHeader style={{backgroundColor: "#FFD266", color:"white"}} className="mt-n4">
            <h3>Are you sure ?</h3>
        </ModalHeader>
        <ModalFooter style={{display: "flex", justifyContent:"center"}}>
        <Button color="success" onClick={() => props.handleLogout()}>
            Logout
            </Button>
        <Link to="/signup">
            <Button color="success" onClick={() => props.setOpenLogout(false)}>
            Cancel
            </Button>
        </Link>
        </ModalFooter>
   </Container>
    )
 }

 export default Logout