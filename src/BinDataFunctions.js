import brownBinIcon from "./Images/BrownBin.jpg";
import blackBinIcon from "./Images/BlackBin.jpg";
import blueBinIcon from "./Images/BlueBin.jpg";
import greenBinIcon from "./Images/GreenBin.jpg";

/**
 * Take the required information from the Biffa JSON
 * @param binJSON - currently test data, will be API data
 * @returns - And array of bin collections containing the relevant data
 */
export function setBinCollection(binJSON) {

    var uprn = localStorage.getItem('uprn');
    var binArray = [];
    var locationObject = null;

    binJSON.forEach(location => {
        if (location["uprn"] === uprn) {
            locationObject = location;
        }
    });
    if (locationObject) {
        locationObject.data.data.collections.forEach(element => {
            if (element.communal_service === "false") {
                var binType = element.bin_type;
                var binImage = getBinImage(binType)
                var dates = [new Date(element.next_date), new Date(element.further_dates[0])]
                if (element.further_dates[1]) {
                    dates.push(new Date(element.further_dates[1]));
                }
                dates.forEach(date => {
                    var binObject = { type: binType, date: date, imageUrl: binImage };
                    binArray.push(binObject);
                });
            }
        });
 
        binArray.sort((a, b) => {
            return a.date - b.date;
        })

        binArray.forEach(element => {
            element.date = getLongDate(element.date);
        });

        return binArray;
    }
}

/**
 * @param binArray
 * @returns an array of the unique dates from the collections array
 */
export function getArrayOfDates(binArray) {
    var binDates = [];
    binArray.forEach(element => {
        if (!binDates.includes(element.date)) {
            binDates.push(element.date);
        }
    });
    return binDates;
}

/**
 * @param binArray 
 * @returns nested array of each unique date in the bin array with the relevant bins.
 */
export function getArrayOfBinByDate(binArray) {
    var dateArray = getArrayOfDates(binArray);
    var binArrayByDate = [];
    dateArray.forEach(date => {
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
/**
 * @param binArray 
 * @returns The HTML for the future collections page
 */
export function getFutureCollections(binArray) {

    console.log(binArray[0]);
    var futureArray = binArray.slice(1);

    return <>
        {futureArray.map(binDay => {
            return <div key={binDay.date}>
                <h3>{binDay.date}</h3>
                {binDay.bins.map(bin => {
                    return <img className="bin-image" key={bin.type} src={bin.imageUrl} alt={bin.type} height="100" />;
                })
                }
            </div>
        })}
    </>
}

/**
 * @param binArray 
 * @returns The HTML for the first collection in the list that will be displayed on the home page
 */
export function getFirstCollectionHTML(binArray) {

    var rowDate = binArray[0].date;

    return <>
        <h2>Next bin collection: {binArray[0].date}</h2>
        {binArray.map(element => {
            if (element.date === rowDate) {
                return <img className="bin-image" key={element.type} src={element.imageUrl} alt={element.type} height="100" />
            } else {
                return null;
            }
        })}
    </>

}

/**
 * @param date object.
 * @returns the date in long format Weekday, date, month, year
 */
function getLongDate(date) {

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var day = weekday[date.getDay()];

    var longDate = day + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

    return longDate;

}

/**
 * @param binType from array
 * @returns location of the image for that bin type
 */
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