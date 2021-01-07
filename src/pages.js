import React, { useReducer, useState } from "react";
import { Link } from 'react-router-dom';
import './App.css';
import binData from "./exampledata.json";
import * as BinDataFunctions from './BinDataFunctions.js';
import MCCLogo from "./Images/MCCLogo.PNG";

export function Heading() {
    return (
        <div className="header">
            <img src={MCCLogo} alt="Manchester City Council" />
            <Link to="YourInfo">Settings</Link>
        </div>
    );
}

export function Home() {
    return (
        <div>
            {BinData()}
        </div>
    )
}

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export function UserInfo() {

    const [uprn, setUprn] = useState(null);
    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    return (
        <div>
            <h2>Your Location</h2>
            <form name="settingsForm" onSubmit={(e) => console.log(e.target)}>
                <label for="address">select Address:</label>
                <select name="address" id="address" onChange={handleChange}>
                    <option value="77074250">2, AVESON AVENUE, M21 8EY</option>
                    <option value="3">3, AVESON AVENUE, M21 8EY</option>
                </select>
                <h2>Notifications</h2>
                <input type="checkbox" id="notificationOn" name="notificationOn"></input>
                <label for="notificationOn">Turn on notifications the day before your collection</label><br />
                <input type="time" id="time" name="time"></input>
                <label for="time">Time of notification</label><br />
                <button type="submit">Save Changes</button>
            </form>
            <div>
                You are submitting the following:
                <ul>
                    {Object.entries(formData).map(([name, value]) => (
                        <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function BinData() {
    const [binJSON, setData] = useState(binData);
    //Production release will get the binJSON from the Biffa API call
    //The UPRN will come from a GazOPs API lookup.
    //https://www.manchester.gov.uk/site/custom_scripts/bin_dates_gazops/index.php?uprn=000077074250
    if (binJSON) {

        var HTML = BinDataFunctions.getRowHTML(BinDataFunctions.setBinCollection(binJSON));

        return <>
            {HTML}<br />
            <Link to="FutureCollections">See future collections</Link>
        </>

    }
    return UserInfo();
}

export function FutureCollections() {
    return (
        <>
            <h2>To Be Built</h2>
            <p>This page will contain the next 3 collections after the current one.</p>
        </>
    );
}