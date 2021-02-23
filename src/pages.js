import React, { useReducer } from "react";
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import binData from "./BinData/testData.json";
import addressData from "./BinData/addresses.json"
import * as BinDataFunctions from './BinDataFunctions.js';
import MCCLogo from "./Images/MCCLogo.PNG";

export function Heading() {
    return (
        <div className="header">
            <Link to="./"><img src={MCCLogo} alt="Manchester City Council" /></Link>
            <Link to="YourInfo">Settings</Link>
        </div>
    );
}

export function Home() {

    const uprn = localStorage.getItem('uprn');
    
    console.log("Uprn at start: " + uprn);
    if (uprn === "undefined") {
        return (
            <div>
                <p>No bins found, please update your address in the settings</p>
            </div>
        )
    } else {
        return (
            <div>
                {BinData(uprn)}<br />
                <Link to={`/FutureCollections?uprn=${uprn}`}>See future collections</Link><br />
                {ReportAnIssue()}<br />
                {recycling()}
            </div>
        )
    }
}

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export function UserInfo() {

    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    console.log("local storage:" + localStorage.getItem('uprn'));

    return (
        <div>
            <h2>Settings</h2>
            <form name="settingsForm" onSubmit={(e) => { localStorage.setItem('uprn', formData.address); e.preventDefault(); }}>
                <h3>Your Location</h3>
                <label htmlFor="address">select Address:</label> <br />
                <select name="address" id="address" onChange={handleChange}>
                {displayAddressOptions(addressData)}
                </select>
                <h3>Notifications</h3>
                <input type="checkbox" id="notificationOn" name="notificationOn"></input>
                <label htmlFor="notificationOn">Turn on notifications the day before your collection</label><br />
                <input type="time" id="time" name="time"></input>
                <label htmlFor="time">Time of notification</label><br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

function displayAddressOptions(addressData){
    console.log(addressData);
    return <>
        {addressData.map(address => {
            console.log(address.address);
            if (address.uprn == localStorage.getItem('uprn')) {
                return <option value={address.uprn} selected>{address.address}</option>
            } else {
                return <option value={address.uprn}>{address.address}</option>;
            }
        })}
    </>
}

export function BinData(uprn) {

    //Production release will get the binJSON from the Biffa API call
    //The UPRN will come from a GazOPs API lookup.
    //https://www.manchester.gov.uk/site/custom_scripts/bin_dates_gazops/index.php?uprn=000077074250
    if (uprn) {

        var HTML = BinDataFunctions.getFirstCollectionHTML(BinDataFunctions.setBinCollection(binData, uprn));

        return <>
            {HTML}
        </>

    }
    return UserInfo();
}

export function FutureCollections() {

    var {search} = useLocation();
    var uprn = search.slice(6, search.length);

    return (
        <>
            <h2>Future Collections</h2>
            {BinDataFunctions.getFutureCollections(BinDataFunctions.getArrayOfBinByDate(BinDataFunctions.setBinCollection(binData, uprn)))}
        </>
    );
}

export function ReportAnIssue() {
    return (
        <div>
            <h2>Report Something</h2>
            <ul>
                <li>
                    <a href="https://www.manchester.gov.uk/info/200084/bins_rubbish_and_recycling/6479/report_a_problem_with_your_bin_collection">Problem with a collection</a>
                </li>
                <li>
                    <a href="https://www.manchester.gov.uk/info/200084/bins_rubbish_and_recycling/6252/bin_missing_damaged_or_a_problem_with_a_collection">Missing Bin</a>
                </li>
                <li>
                    <a href="https://secure.manchester.gov.uk/forms/form/1615/en/report_an_abandoned_bin">Abandoned Bin</a>
                </li>
            </ul>
        </div>
    )
}

export function recycling() {
    return (
        <div>
            <h2>What goes in each bin?</h2>
            <a href="https://www.manchester.gov.uk/info/200084/bins_rubbish_and_recycling/6026/see_which_recycling_bin_to_use">See which recycling bin to use</a>
        </div>
    )
}