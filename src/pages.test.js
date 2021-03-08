import { FutureCollections, Heading, Home, UserInfo, BinData, Alerts } from './pages';
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

test("Home with no URPN", () => {
    const uprn = localStorage.setItem('uprn', "undefined");
    const {getByTestId} = render(<Home />);
    expect(getByTestId('home no uprn')).toHaveTextContent("No bins found");
});

// test("Home with URPN", () => {
//     const uprn = localStorage.setItem('uprn', "77074250");
//     const {getByTestId} = render(<Home />);
//     expect(getByTestId('home uprn')).toHaveTextContent("next");
// });