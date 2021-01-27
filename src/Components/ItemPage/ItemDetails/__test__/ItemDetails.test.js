import React from 'react';
import ReactDOM from 'react-dom';
import ItemDetails from '../ItemDetails';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting ItemDetails.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ItemDetails />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})