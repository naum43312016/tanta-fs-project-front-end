import React from 'react';
import ReactDOM from 'react-dom';
import MyItems from '../MyItems';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import BASE_URL from '../../../../Tools/URLs';

// import '@testing-library/user-event';

// globalThis.fetch = jest.fn(() => Promise.resolve({
//     json: () => Promise.resolve({
//         icon_url: 'http://image.png', value: "Joke text"
//     })
// }));

test('Mounting MyItems.jsx', async () => {
    const div = document.createElement('div');
    await act(async () => ReactDOM.render(<MyItems />, div));
    const unmountedApp = ReactDOM.unmountComponentAtNode(div);
    expect(unmountedApp).toBe(true);
})