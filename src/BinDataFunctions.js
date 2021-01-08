import brownBinIcon from "./Images/BrownBin.jpg";
import blackBinIcon from "./Images/BlackBin.jpg";
import blueBinIcon from "./Images/BlueBin.jpg";
import greenBinIcon from "./Images/GreenBin.jpg";

export function setBinCollection(binJSON) {

    var binArray = [];
    binJSON.data.collections.forEach(element => {
        var binDate = new Date(element.next_date);
        var binType = element.bin_type;
        var binImage = getBinImage(binType)
        var binObject = { type: binType, date: binDate, imageUrl: binImage };
        binArray.push(binObject);
    });

    binArray.sort(function (a, b) { return a.date - b.date });

    binArray.forEach(element => {
        element.date = getLongDate(element.date);
    });

    return binArray;
}

function getArrayOfDates(binArray) {
    var binDates = [];
    binDates.push(binArray[0].date);
    binArray.forEach(element => {
        if (!binDates.includes(element.date)) {
            binDates.push(element.date);
        }
    });
    return binDates;
}

// function createBinRowsObject(binArray){

// }

// function addBinsToDate(binArray, date){
//     var collectionDate = date;
//     var binObjectArray = [];
//     var binObject =  { type: binType, imageUrl: binImage };
//     binArray.forEach(element => {
//         if (element.date.getDate() === collectionDate){
//             binObject = {type, imageUrl};
//             binObjectArray.push(binObject);
//         }
//     });
// }

export function getFutureCollections(binArray) {
    var rowDate = getArrayOfDates(binArray)[1];
    return <>
        <h3>{rowDate}</h3>
        {binArray.map(element => {
            if (element.date === rowDate) {
                return <img className="bin-image" key={element.type} src={element.imageUrl} alt={element.type} height="100" />
            }
        })}
    </>
}

function getRowHTML(binArray, rowDate) {
    return <>
        <h3>{rowDate}</h3>
        {binArray.map(element => {
            if (element.date === rowDate) {
                return <img className="bin-image" key={element.type} src={element.imageUrl} alt={element.type} height="100" />
            }
        })}
    </>
}

export function getFirstCollectionHTML(binArray) {

    var rowDate = binArray[0].date;

    return <>
        <h2>Next bin collection: {binArray[0].date}</h2>
        {binArray.map(element => {
            if (element.date === rowDate) {
                return <img className="bin-image" key={element.type} src={element.imageUrl} alt={element.type} height="100" />
            }
        })}
    </>

}

function getLongDate(date) {

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var longDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

    return longDate;

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