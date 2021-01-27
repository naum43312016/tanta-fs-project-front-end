import React from 'react';
import ReactDOM from 'react-dom';
import ItemCards from '../ItemCards';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';

test('Mounting ItemCards.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ItemCards />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})