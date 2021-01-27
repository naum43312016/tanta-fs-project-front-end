import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from '../AddItem';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting AddItem.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddItem />, div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})