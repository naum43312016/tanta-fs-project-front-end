import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../SignUp';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting SignUp.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SignUp />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})