import React, { useEffect, useState, } from "react";
import './App.css';
import binData from "./exampledata.json";
import './BinDataFunctions.js';
import brownBinIcon from "./Images/BrownBin.jpg";
import blackBinIcon from "./Images/BlackBin.jpg";
import blueBinIcon from "./Images/BlueBin.jpg";
import greenBinIcon from "./Images/GreenBin.jpg";

/*
function PostCodeForm() {
  const [postcode, setPostcode] = useState("value from form when I work that out");
  const [display, setDisplay] = useState(false)
  console.log(postcode);
  console.log(display);

  return (
    <div>
      <h1>Please enter your Postcode</h1>
      <form name="PostCodeForm" onSubmit={(e) => { e.preventDefault(); setDisplay(true) }} >
        <label for="postcode">Postcode:</label>
        <input type="text" id="fPostcode" name="fPostcode" onChange={e => setPostcode(e.target.value)}></input>
        <button type="submit">Go</button>
      </form>
      <p>{display && postcode}</p>
    </div>
  );
}
*/

function setBinCollection(binJSON) {

  var binArray = [];
  binJSON.data.collections.forEach(element => {
    var binDate = new Date(element.next_date);
    var binType = element.bin_type;
    var binImage = getBinImage(binType)
    var binObject = { type: binType, date: binDate, imageUrl: binImage };
    binArray.push(binObject);
  });

  binArray.sort(function (a, b) { return a.date - b.date });

  return binArray;
}

function getRowHTML(binArray) {

  var rowDate = binArray[0].date;

  return <>
    <h2>Next bin collection on {binArray[0].date.getDate()}</h2>
    {binArray.map(element => {
      if (element.date.getDate() == rowDate.getDate()) {
        return <img key={element.type} src={element.imageUrl} alt={element.type} height="100"/>
      }
    })}
  </>

}

function getBinImage(binType) {

  var imageLocation;

  switch (binType) {
    case "Blue Bin":
      imageLocation = blueBinIcon
      break;
    case "Brown Bin":
      imageLocation = brownBinIcon
      break;
    case "Green Bin":
      imageLocation = greenBinIcon
      break;
    case "Black / Grey Bin":
      imageLocation = blackBinIcon
      break;
    default:
      break;
  }

  return imageLocation;
}

function BinData() {
  const [binJSON, setData] = useState(binData);
  //Production release will get the binJSON from the Biffa API call
  //https://www.manchester.gov.uk/site/custom_scripts/bin_dates_gazops/index.php?uprn=000077074250
  if (binJSON) {
    var binArray = setBinCollection(binJSON);

    // binArray.forEach(element => {
    //   console.log(element);
    // });

    var HTML = getRowHTML(binArray);

    return <>{HTML}</>

  }
  return <div>No bins!</div>;

}

function App() {
  return <><BinData /></>
}

export default App;