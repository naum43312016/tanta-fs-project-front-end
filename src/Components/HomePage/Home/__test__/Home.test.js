import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../Home';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';

test('Mounting Home.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})