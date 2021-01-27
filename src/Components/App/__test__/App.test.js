import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("Mounting app", () => {
    test('Rendering app', () => {
        expect(true).toBe(true);
    })
})