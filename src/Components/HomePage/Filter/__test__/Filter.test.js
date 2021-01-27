import React from 'react';
import ReactDOM from 'react-dom';
import Filter from '../Filter';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting Filter.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Filter />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})