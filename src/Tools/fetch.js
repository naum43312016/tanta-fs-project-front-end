import BASE_URL from './URLs';
const axios = require('axios');
const { invalidFields, signUpSuccess, signInSuccess, updatedProfile } = require('./WebsiteResponses');

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
}

const checkFields = (userDetails) => {
  const { firstName, lastName, email, password, phone } = userDetails;
  console.log(password.length >= 6 && password.length <= 32)
  if (firstName.length <= 2 || lastName.length <= 2) {
    return invalidFields('First and last name should contain at least 2 characters');
  }
  if (!validateEmail(email)) {
    return invalidFields("Please use a valid email address");
  }
  if (password.length <= 6 && password.length >= 32) {
    return invalidFields("Please keep your password length between 6 and 32 characters");
  }
  if (phone.length < 10) {
    return invalidFields("Please enter a valid phone number")
  }
  return true;
}


const Signup = (userDetails, setAuthenticated) => {
  if (checkFields(userDetails) === true) {
    return axios.post(`${BASE_URL}/signup`, userDetails)
      .then(
        (res) => res.status === 200 ? (localStorage.setItem("token", res.data.token), signUpSuccess(), localStorage.setItem('firstName', res.data.user.firstName), localStorage.setItem("sessionID", res.data.user._id),
                  setAuthenticated(true)) : null
      )
      .catch(err => console.error(err))
  }
};

const SignIn = (userDetails, setAuthenticated) => {
  return axios.post(`${BASE_URL}/login`, userDetails)
    .then(
      (res) => res.status === 200 ? (localStorage.setItem("token", res.data.token), signInSuccess(), localStorage.setItem("firstName", res.data.user.firstName), localStorage.setItem("sessionID", res.data.user._id),
        setAuthenticated(true)) : null
    )
    .catch((err) => console.log(err.response.data));
};


const getCookies = (setAuthenticated) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: "Bearer " + token } }
  return axios.get(BASE_URL + "/", config)
    .then(res =>
      res.status === 200
        ? (setAuthenticated(true))
        : console.log("Couldn't authenticate")
    )
    .catch((err) => console.log(err));
};

const checkForAdmin = (setState, bool, bool2) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: "Bearer " + token } }
  axios.get(BASE_URL +  '/upload', config)
    .then(res => setState(bool))
    .catch(err => setState(bool2))
}

const submitProfileChanges = (details, userDocument) => {
  if (checkFields(details) === true) {
    console.log('ho')
    axios.put(BASE_URL + `/profile/${userDocument._id}`, {
      details
    })
      .then(res => updatedProfile("Profile updated", "success"))
      .catch(err => updatedProfile("There was an issue updating your profile", "error"));
  }
}

export {  Signup, 
          SignIn, 
          getCookies, 
          validateEmail, 
          checkForAdmin, 
          submitProfileChanges,
        }
