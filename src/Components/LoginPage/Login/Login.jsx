import React from "react";
import { Container, Form, Label, Input, FormGroup, Button, ModalHeader, ModalBody, ModalFooter, Row } from "reactstrap";
import { useContext, useState } from "react";
import { Router, Link } from "react-router-dom";
import { SignIn } from '../../../Tools/fetch';
import { Authentication } from '../../../Contexts/Authentication';

const Login = (props) => {
  const { setAuthenticated } = useContext(Authentication);
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
  })

  const switchToSignUp = () => {
    props.setOpenLogin(false);
    props.setOpenSignup(true);
    setUserInfos({
      ...userInfos,
      email: '',
      password: '',
    })
  };

  const handleChange = (event) => {
    setUserInfos({
      ...userInfos,
      [event.target.name]: event.target.value
    })
  }

  const LoginUser = () => {
    const userDetails = { ...userInfos, role: "USER_STATUS" }
    SignIn(userDetails, setAuthenticated)
  };

  return (
    <Container>
      <Row className="d-flex justify-content-end">
        <a href to="/home">
          <Button color="danger mr-3 mt-3" onClick={() => props.setOpenLogin(false)}>
            X
        </Button>
        </a>
      </Row>
      <ModalHeader style={{ backgroundColor: "#B1DEF5" }} className="mt-n4">Login</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              onChange={(event) => handleChange(event)}
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@something.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              onChange={(event) => handleChange(event)}
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

        <Button onClick={switchToSignUp} color="success">
          I Don't Have An Account Yet
          </Button>

      </ModalFooter>
    </Container>
  );
};

export default Login;
