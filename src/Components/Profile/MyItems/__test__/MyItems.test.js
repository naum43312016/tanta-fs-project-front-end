import React from 'react';
import ReactDOM from 'react-dom';
import MyItems from '../MyItems';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting MyItems.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MyItems />,
        div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})