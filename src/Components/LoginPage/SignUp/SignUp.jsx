import React from "react";
import { Form, Container, Row, Label, Input, FormGroup, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from '../../../Tools/fetch';
import { Authentication } from '../../../Contexts/Authentication';
import { invalidFields } from '../../../Tools/WebsiteResponses';

const SignUp = (props) => {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    userName: '',
    address: '',
    confirmPassword: '',
  })
  const { setAuthenticated } = useContext(Authentication);

  const switchToLogin = () => {
    props.setOpenSignup(false);
    props.setOpenLogin(true);
    setUserInfos(null)
  };

  const submitUser = () => {
    if (userInfos.password === userInfos.confirmPassword) {
      const userDetails = { ...userInfos }
      Signup(userDetails, setAuthenticated);
    } else {
      invalidFields("Passwords didn't match");
    }
  };

  const handleChange = (e) => {
    setUserInfos({
      ...userInfos,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container>
      <Row className="d-flex justify-content-end">
        <a href="/home">
          <Button color="danger mr-3 mt-3" onClick={() => props.setOpenSignup(false)}>
            X
          </Button>
        </a>
      </Row>
      <ModalHeader style={{ backgroundColor: "#B1DEF5" }} className="mt-n4">Create Account</ModalHeader>
      <ModalBody>
        <Form>
          <div className="d-flex flex-row">
            <FormGroup>
              <Label for="firstName">First Name <span style={{ color: "red" }}>*</span></Label>
              <Input
                required
                onChange={(event) => handleChange(event)}
                type="text"
                name="firstName"
                id="firstname"
              />
            </FormGroup>
            <FormGroup>
              <Label className="ml-3" for="lastName">
                Last Name <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                required
                className="ml-3"
                onChange={(event) => handleChange(event)}
                type="text"
                name="lastName"
                id="lastname"
              />
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="email">Email <span style={{ color: "red" }}>*</span></Label>
            <Input
              required
              onChange={(event) => handleChange(event)}
              type="email"
              name="email"
              placeholder="example@something.com"
              id="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username <span style={{ color: "red" }}>*</span></Label>
            <Input
              required
              onChange={(event) => handleChange(event)}
              type="text"
              name="userName"
              placeholder="Please choose a username"
              id="username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address <span style={{ color: "red" }}>*</span></Label>
            <Input
              required
              onChange={(event) => handleChange(event)}
              type="text"
              name="address"
              placeholder="Enter your address"
              id="address"
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password <span style={{ color: "red" }}>*</span></Label>
            <Input
              required
              onChange={(event) => handleChange(event)}
              type="password"
              name="password"
              id="password"
              placeholder="min 8 char, 1 special char, 1 capital letter"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password-confirm">Confirm Password <span style={{ color: "red" }}>*</span></Label>
            <Input
              required
              onChange={(event) => handleChange(event)}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number <span style={{ color: "red" }}>*</span></Label>
            <Input
              required
              onChange={(event) => handleChange(event)}
              type="tel"
              name="phone"
              id="phoneNumber"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" disabled={(userInfos.firstName.length > 0 && userInfos.lastName.length > 0 && userInfos.email.length > 0 && userInfos.password.length > 0 && userInfos.confirmPassword.length > 0 && userInfos.phone.length > 0) ? false : true} onClick={submitUser} >
          Sign Up
        </Button>
        <Button color="primary" onClick={switchToLogin} >
          I Already Have An Account
        </Button>
      </ModalFooter>
    </Container>
  );
};

export default SignUp;