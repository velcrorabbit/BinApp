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
        var binDate = new Date(element.further_dates[0]);
        var binObject2 = { type: binType, date: binDate, imageUrl: binImage };
        binArray.push(binObject2);
        var binDate = new Date(element.further_dates[1]);
        var binObject3 = { type: binType, date: binDate, imageUrl: binImage };
        binArray.push(binObject3);
    });

    binArray.sort((a, b) => {
        return a.date - b.date;
    })

    binArray.forEach(element => {
        element.date = getLongDate(element.date);
    });

    return binArray;
}

// get an array of just the unique bin collection days
function getArrayOfDates(binArray) {
    var binDates = [];
    binArray.forEach(element => {
        if (!binDates.includes(element.date)) {
            binDates.push(element.date);
        }
    });
    return binDates;
}

// create an array of bin dates with each bin collected on that date as an object in a nested array.
export function getArrayOfBinByDate(binArray) {
    var dateArray = getArrayOfDates(binArray);
    var binArrayByDate = [];
    dateArray.forEach(date => {
        var date = date;
        var bins = [];
        binArray.forEach(bin => {
            if (bin.date === date) {
                var binType = bin.type;
                var binImage = bin.imageUrl;
                var binObject = { type: binType, imageUrl: binImage }
                bins.push(binObject);
            }
        });
        var rowObject = { date: date, bins: bins };
        binArrayByDate.push(rowObject);

    });
    return binArrayByDate;
}

export function getFutureCollections(binArray) {

    var futureArray = binArray.slice(1);

    return <>
        {futureArray.map(binDay => {
            return <>
                <h3>{binDay.date}</h3>
                {binDay.bins.map(bin => {
                    return <img className="bin-image" key={bin.type} src={bin.imageUrl} alt={bin.type} height="100" />;
                })
                }
            </>
        })}
    </>
}

// get the html for the first collection in the list that will display on the first page.
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

// change the date object into a more human-readable format
function getLongDate(date) {

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var longDate = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

    return longDate;

}

// get the locations of the image for each bin
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