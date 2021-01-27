import React from 'react';
import ReactDOM from 'react-dom';
import ItemPage from '../ItemPage';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting ItemPage.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ItemPage />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})