import * as BinDataFunctions from './BinDataFunctions.js';
import binData from "./BinData/testData.json";

const binArray = [
  { type: 'Brown Bin', date: 'Wednesday 16 December 2020', imageUrl: 'BrownBin.jpg' },
  { type: 'Green Bin', date: 'Wednesday 16 December 2020', imageUrl: 'GreenBin.jpg' },
  { type: 'Black / Grey Bin', date: 'Wednesday 16 December 2020', imageUrl: 'BlackBin.jpg' },
  { type: 'Blue Bin', date: 'Wednesday 23 December 2020', imageUrl: 'BlueBin.jpg' },
  { type: 'Brown Bin', date: 'Wednesday 30 December 2020', imageUrl: 'BrownBin.jpg' },
  { type: 'Green Bin', date: 'Wednesday 30 December 2020', imageUrl: 'GreenBin.jpg' },
  { type: 'Black / Grey Bin', date: 'Wednesday 30 December 2020', imageUrl: 'BlackBin.jpg' },
  { type: 'Blue Bin', date: 'Wednesday 6 January 2021', imageUrl: 'BlueBin.jpg' },
  { type: 'Brown Bin', date: 'Wednesday 13 January 2021', imageUrl: 'BrownBin.jpg' },
  { type: 'Green Bin', date: 'Wednesday 13 January 2021', imageUrl: 'GreenBin.jpg' },
  { type: 'Black / Grey Bin', date: 'Wednesday 13 January 2021', imageUrl: 'BlackBin.jpg' },
  { type: 'Blue Bin', date: 'Wednesday 20 January 2021', imageUrl: 'BlueBin.jpg' }
];

localStorage.setItem('uprn', "77074250");

test('setBinCollection', () => {
  expect(BinDataFunctions.setBinCollection(binData)).toStrictEqual(binArray);
});

test('getArrayOfDates', () => {
  var dateArray = ["Wednesday 16 December 2020", "Wednesday 23 December 2020", "Wednesday 30 December 2020",
    "Wednesday 6 January 2021", "Wednesday 13 January 2021", "Wednesday 20 January 2021",];
  expect(BinDataFunctions.getArrayOfDates(binArray)).toStrictEqual(dateArray);
});

test('getArrayOfBinByDate', () => {
  var binArrayByDate = [
    {
      "bins": [
        { "imageUrl": "BrownBin.jpg", "type": "Brown Bin" },
        { "imageUrl": "GreenBin.jpg", "type": "Green Bin" },
        { "imageUrl": "BlackBin.jpg", "type": "Black / Grey Bin" }
      ],
      "date": "Wednesday 16 December 2020"
    },
    {
      "bins": [
        { "imageUrl": "BlueBin.jpg", "type": "Blue Bin" }
      ],
      "date": "Wednesday 23 December 2020"
    },
    {
      "bins": [
        { "imageUrl": "BrownBin.jpg", "type": "Brown Bin" },
        { "imageUrl": "GreenBin.jpg", "type": "Green Bin", },
        { "imageUrl": "BlackBin.jpg", "type": "Black / Grey Bin", },
      ],
      "date": "Wednesday 30 December 2020",
    },
    {
      "bins": [
        { "imageUrl": "BlueBin.jpg", "type": "Blue Bin", },
      ],
      "date": "Wednesday 6 January 2021",
    },
    {
      "bins": [
        { "imageUrl": "BrownBin.jpg", "type": "Brown Bin", },
        { "imageUrl": "GreenBin.jpg", "type": "Green Bin", },
        { "imageUrl": "BlackBin.jpg", "type": "Black / Grey Bin", },
      ],
      "date": "Wednesday 13 January 2021",
    },
    {
      "bins": [
        { "imageUrl": "BlueBin.jpg", "type": "Blue Bin", },
      ],
      "date": "Wednesday 20 January 2021",
    },
  ];
  expect(BinDataFunctions.getArrayOfBinByDate(binArray)).toStrictEqual(binArrayByDate);
});
