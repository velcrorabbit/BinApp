import { FutureCollections, Heading, Home, UserInfo, BinData, Alerts } from './pages';
import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from 'react-router-dom';

function renderWithRouter(componant) {
    return render(<Router>{componant}</Router>);
}


test("Home with no URPN", () => {
    const uprn = localStorage.setItem('uprn', "undefined");
    const {getByTestId} = renderWithRouter(<Home />);
    expect(getByTestId('home no uprn')).toHaveTextContent("No bins found");
});

test("Home with URPN", () => {
    const uprn = localStorage.setItem('uprn', "77074250");
    const {getByTestId} = renderWithRouter(<Home />);
    expect(getByTestId('home uprn')).toHaveTextContent("Next bin collection: Wednesday 16 December 2020");
});

test("Settings with UPRN", () => {
    localStorage.setItem('uprn', "77074250");
    const {getByTestId} = renderWithRouter(<UserInfo />);
    expect(getByTestId('address select')).toHaveDisplayValue("2, AVESON AVENUE, M21 8EY");
});

test("Settings with no UPRN", () => {
    localStorage.setItem('uprn', "undefined");
    const {getByTestId} = renderWithRouter(<UserInfo />);
    expect(getByTestId('address select')).toHaveDisplayValue("None");
});


