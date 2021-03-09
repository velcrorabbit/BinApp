import React from "react";
import { Link } from 'react-router-dom';
import './App.css';
import binData from "./BinData/testData.json";
import addressData from "./BinData/addresses.json"
import * as BinDataFunctions from './BinDataFunctions.js';
import MCCLogo from "./Images/MCCLogo.PNG";
import settingsIcon from "./Images/settings.png";
import brownBinIcon from "./Images/BrownBin.jpg";
import blackBinIcon from "./Images/BlackBin.jpg";
import blueBinIcon from "./Images/BlueBin.jpg";
import greenBinIcon from "./Images/GreenBin.jpg";


/**
 * Display a heading with navigation links and MCC Branding.
 */
export function Heading() {
    return (
        <div className="header">
            <Link to="./"><img class="logo" src={MCCLogo} alt="Manchester City Council" /></Link>
            <Link to="YourInfo"><img class="settings" src={settingsIcon} alt="Settings" /></Link>
        </div>
    );
}

/**
 * Display the home page. If a UPRN has not been set, it asks the user to update it in the settings.
 * This is to avoid errors from null values.
 */
export function Home() {
    
    var uprn = localStorage.getItem('uprn');

    if (uprn === "undefined") {
        return (
            <div data-testid="home no uprn">
                <p>No bins found, please update your address in the settings</p><br />
                {ReportAnIssue()}<br />
                {recycling()}
            </div>
        )
    } else {
        return (
            <div data-testid="home uprn">
                {BinData()}<br />
                <Link to={`/FutureCollections`}>See future collections</Link><br />
                {recycling()}<br />
                {ReportAnIssue()}
            </div>
        )
    }
}

/**
 * This segment can be added to the app.js file to add alerts if there is important information to send out.
 */
export function Alerts(){
    
    return <h2 className="banner">This is an alert that can be changed if needed</h2>

}

/**
 * Display the Settings Page with a form for the user to enter their details and preferences.
 */
export function UserInfo() {

    return (
        <div>
            <h2>Settings</h2>
            <form name="settingsForm" onSubmit={(e) => { localStorage.setItem('uprn', document.getElementById("address").value); e.preventDefault(); }}>
                <h3>Your location</h3>
                {displayAddressSelect(addressData)}
                <h3>Notifications</h3>
                <label htmlFor="notificationOn">Turn on notifications the day before your collection</label>
                <input type="checkbox" id="notificationOn" name="notificationOn"></input><br />
                <label htmlFor="time">Time of notification</label>
                <input type="time" id="time" name="time"></input><br />
                <button type="submit">Save Changes</button>
            </form>
            <h3>Your data</h3>
            <p>Remove your saved address. Bin information will not be shown unless you select and save an address</p>
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
        <label htmlFor="address">Select address:</label>
        <select data-testid="address select" name="address" id="address" defaultValue={localStorage.getItem('uprn')}>
            <option value="undefined" key="undefined">None</option>
        {addressData.map(address => {
            return <option value={address.uprn} key={address.uprn}>{address.address}</option>;
        })}
        </select>
    </>
}

/**
 * Display the first collection listed in the JSON file.
 */
export function BinData() {

    //Production release will get the binJSON from the Biffa API call
    //The UPRN will come from a GazOPs API lookup.
    //https://www.manchester.gov.uk/site/custom_scripts/bin_dates_gazops/index.php?uprn=000077074250
    return BinDataFunctions.getFirstCollectionHTML(BinDataFunctions.setBinCollection(binData));
}

/**
 * Display a page showing all future collections barring the first one.
 */
export function FutureCollections() {

    return (<>
            <h2>Future Collections</h2>
            {BinDataFunctions.getFutureCollections(BinDataFunctions.getArrayOfBinByDate(BinDataFunctions.setBinCollection(binData)))}
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
                <li>
                    <a href="https://www.manchester.gov.uk/info/200084/bins_rubbish_and_recycling/6217/get_a_new_bin_box_or_recycling_bag">Order a bin, box or recycling bag </a>
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
        <div class="bin-info-images">
            <h2>What goes in each bin?</h2>
            <Link to="./GreenBinContents"><img class="bin-image" src={greenBinIcon} alt="Green Bin" /></Link>
            <Link to="./BlackBinContents"><img class="bin-image" src={blackBinIcon} alt="Black Bin" /></Link>
            <Link to="./BrownBinContents"><img class="bin-image" src={brownBinIcon} alt="Brown Bin" /></Link>
            <Link to="./BlueBinContents"><img class="bin-image" src={blueBinIcon} alt="Blue Bin" /></Link>
        </div>
    )
}

export function GreenBinContents() {
    return (
        <div>
            <h2>Green Bin</h2>
            <p>Food waste should be put in compostable bags first.</p>
            <ul>
                <li>Meat and fish bones</li>
                <li>twigs and branches</li>
                <li>cooked and raw meat</li>
                <li>bread products</li>
                <li>fruit and veg peelings</li>
                <li>tea bags</li>
                <li>plate scrapings</li>
                <li>cut flowers</li>
                <li>dairy products and egg shells</li>
                <li>grass cuttings and hedge clippings</li>
            </ul>
        </div>
    )
}

export function BlackBinContents() {
    return (
        <div>
            <h2>Black Bin</h2>
            <ul>
                <li>Nappies</li>
                <li>coffee cups</li>
                <li>polystyrene</li>
                <li>bottle tops</li>
                <li>plant pots</li>
                <li>plastic food trays</li>
                <li>plastic bags</li>
                <li>plastic film</li>
                <li>bubble wrap</li>
            </ul>
        </div>
    )
}

export function BrownBinContents() {
    return (
        <div>
            <h2>Brown Bin</h2>
            <ul>
                <li>Plastic bottles including shampoo bottles</li>
                <li>bleach bottles</li>
                <li>mouthwash bottles</li>
                <li>drinks bottles</li>
                <li>washing up liquid bottles</li>
                <li>milk bottles</li>
                <li>foil and foil trays</li>
                <li>empty aerosols</li>
                <li>food tins</li>
                <li>drinks cans</li>
                <li>glass bottles</li>
                <li>glass jars</li>
            </ul>
        </div>
    )
}

export function BlueBinContents() {
    return (
        <div>
            <h2>Blue Bin</h2>
            <p>Please ensure you crush down boxes and large bits of cardboard to fit as much in your bins as possible.</p>
            <ul>
                <li>Cardboard</li>
                <li>food and drink cartons</li>
                <li>magazines</li>
                <li>comics</li>
                <li>waste paper</li>
                <li>newspapers</li>
                <li>cardboard egg boxes</li>
                <li>pizza boxes</li>
                <li>juice boxes</li>
                <li>travel tickets (for bus, tram, train)</li>
                <li>cards</li>
                <li>flyers</li>
                <li>leaflets</li>
                <li>pamphlets</li>
                <li>catalogues</li>
            </ul>
        </div>
    )
}