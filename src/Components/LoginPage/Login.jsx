import React, { useEffect } from "react";
import { Container, Form, Label, Input, FormGroup, Button, ModalHeader, ModalBody, ModalFooter, Row } from "reactstrap";
import { useContext, useState } from "react";
import { Link, Router } from "react-router-dom";
import { SignIn } from '../../Tools/fetch';
import { Authentication } from '../../Contexts/Authentication';

const Login = (props) => {
  const { setAuthenticated } = useContext(Authentication);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchToSignUp = () => {
    props.setOpenLogin(false);
    props.setOpenSignup(true);
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    console.log(email)
  }, [])

  const LoginUser = () => {
    const userDetails = { email, password, role: "USER_STATUS" }
    SignIn(userDetails, setAuthenticated);
  };

  useEffect(() => {
  }, [password]);

  return (
    <Container>
      <Row className="d-flex justify-content-end">
        <Link to="/home">
          <Button color="danger mr-3 mt-3" onClick={() => props.setOpenLogin(false)}>
            X
        </Button>
        </Link>
      </Row>
      <ModalHeader style={{backgroundColor: "#B1DEF5"}} className="mt-n4">Login</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@something.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              name="password"
              id="examplePassword"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={LoginUser} color="success">
          Login
          </Button>
        <Link to="/signup">
          <Button onClick={switchToSignUp} color="success">
            I Don't Have An Account Yet
          </Button>
        </Link>
      </ModalFooter>
    </Container>
  );
};

export default Login;
