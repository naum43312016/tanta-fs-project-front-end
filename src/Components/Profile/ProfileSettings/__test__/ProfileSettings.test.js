import React from 'react';
import ReactDOM from 'react-dom';
import ProfileSettings from '../ProfileSettings';
import '@testing-library/jest-dom';
// import '@testing-library/user-event';


test('Mounting ProfileSetting.jsx', () => {
   const div = document.createElement('div');
    ReactDOM.render(
        <ProfileSettings />,
        div);
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})