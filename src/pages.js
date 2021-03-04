import React, { useReducer } from "react";
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import binData from "./BinData/testData.json";
import addressData from "./BinData/addresses.json"
import * as BinDataFunctions from './BinDataFunctions.js';
import MCCLogo from "./Images/MCCLogo.PNG";
import settingsIcon from "./Images/settings.png";

/**
 * Display a heading with navigation links and MCC Branding.
 */
export function Heading() {
    return (
        <div className="header">
            <Link to="./"><img src={MCCLogo} alt="Manchester City Council" /></Link>
            <Link to="YourInfo"><img src={settingsIcon} alt="Settings" /></Link>
        </div>
    );
}

/**
 * Display the home page. If a UPRN has not been set, it asks the user to update it in the settings.
 * This is to avoid errors from null values.
 */
export function Home() {

    const uprn = localStorage.getItem('uprn');
    
    if (uprn === "undefined") {
        return (
            <div>
                <p>No bins found, please update your address in the settings</p><br />
                {ReportAnIssue()}<br />
                {recycling()}
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

/**
 * Display the Settings Page with a form for the user to enter their details and preferences.
 */
export function UserInfo() {

    return (
        <div>
            <h2>Settings</h2>
            <form name="settingsForm" onSubmit={(e) => { localStorage.setItem('uprn', document.getElementById("address").value); e.preventDefault(); }}>
                <h3>Your Location</h3>
                {displayAddressSelect(addressData)}
                <h3>Notifications</h3>
                <input type="checkbox" id="notificationOn" name="notificationOn"></input>
                <label htmlFor="notificationOn">Turn on notifications the day before your collection</label><br />
                <input type="time" id="time" name="time"></input>
                <label htmlFor="time">Time of notification</label><br />
                <button type="submit">Save Changes</button>
            </form>
            <h3>Your Data</h3>
            <button onClick={(e) => localStorage.setItem('uprn', "undefined")}>Clear data</button>
        </div>
    );
}

/**
 * Create a dynamic address lookup that sets the default value to the currently selected UPRN
 * Pulled out as a seperate function for neatness and also so it can be easily replaced by the GazOps API.
 * @param addressData - A temporary JSON of the test addresses 
 */
function displayAddressSelect(addressData){
    return <>
        <label htmlFor="address">select Address:</label> <br />
        <select name="address" id="address" defaultValue={localStorage.getItem('uprn')}>
        {addressData.map(address => {
            return <option value={address.uprn}>{address.address}</option>;
        })}
        </select>
    </>
}

/**
 * Display the first collection listed in the JSON file.
 * @param uprn 
 */
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

/**
 * Display a page showing all future collections barring the first one.
 */
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

/**
 * Display a segment with links to the bin issue pages from the website.
 */
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

/**
 * Display a link to information about what goes in each bin.
 * Production version will have seperate pages for each bin linked from the bin images themselves.
 */
export function recycling() {
    return (
        <div>
            <h2>What goes in each bin?</h2>
            <a href="https://www.manchester.gov.uk/info/200084/bins_rubbish_and_recycling/6026/see_which_recycling_bin_to_use">See which recycling bin to use</a>
        </div>
    )
}