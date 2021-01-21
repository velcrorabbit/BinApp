import React, { useReducer, useState } from "react";
import { Link } from 'react-router-dom';
import './App.css';
import binData from "./BinData/testData.json";
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
    if(binData===null){
        return (
            <div>
                {UserInfo()}
            </div>
        )
    } else {
        return (
            <div>
                {BinData()}
                {ReportAnIssue()}
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
            <h2>Settings</h2>
            <form name="settingsForm" onSubmit={(e) => {setUprn(formData.address); e.preventDefault();}}>
                <h3>Your Location</h3>
                <label htmlFor="address">select Address:</label> <br />
                <select name="address" id="address" onChange={handleChange}>
                    <option value="77074250">2, AVESON AVENUE, M21 8EY</option>
                    <option value="77086475">179, MANLEY ROAD, M21 0GY</option>
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

export function BinData() {
    const [binJSON, setData] = useState(binData);
    //Production release will get the binJSON from the Biffa API call
    //The UPRN will come from a GazOPs API lookup.
    //https://www.manchester.gov.uk/site/custom_scripts/bin_dates_gazops/index.php?uprn=000077074250
    if (binJSON) {

        var HTML = BinDataFunctions.getFirstCollectionHTML(BinDataFunctions.setBinCollection(binJSON));

        return <>
            {HTML}<br />
            <Link to="FutureCollections">See future collections</Link>
        </>

    }
    return UserInfo();
}

export function FutureCollections() {
    const [binJSON, setData] = useState(binData);
    return (
        <>
            <h2>Future Collections</h2>
            {BinDataFunctions.getFutureCollections(BinDataFunctions.getArrayOfBinByDate(BinDataFunctions.setBinCollection(binJSON)))}
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