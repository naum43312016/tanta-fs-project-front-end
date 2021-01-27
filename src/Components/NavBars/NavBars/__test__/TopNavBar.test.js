import React from 'react';
import ReactDOM from 'react-dom';
import TopNavBar from '../TopNavBar';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting TopNavBar.jsx', () => {
    const div = document.createElement('div');
    ReactDOM.render(        
        <TopNavBar />,
        div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})