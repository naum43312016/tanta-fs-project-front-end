import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';

test('Mounting App.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})