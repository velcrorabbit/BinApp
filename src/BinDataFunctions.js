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
  
    return binArray;
}

export function getRowHTML(binArray) {

    var rowDate = binArray[0].date;

    return <>
        <h2>Next bin collection on {binArray[0].date.getDate()}/{binArray[0].date.getMonth()}/{binArray[0].date.getYear()}</h2>
        {binArray.map(element => {
        if (element.date.getDate() === rowDate.getDate()) {
            return <img className="bin-image" key={element.type} src={element.imageUrl} alt={element.type} height="100"/>
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