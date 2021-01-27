import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting Login.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})