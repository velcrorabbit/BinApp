import React, { useEffect, useState, } from "react";
import './App.css';
import binData from "./exampledata.json";
import './BinDataFunctions.js';
import brownBinIcon from "./Images/BrownBin.jpg";
import blackBinIcon from "./Images/BlackBin.jpg";
import blueBinIcon from "./Images/BlueBin.jpg";
import greenBinIcon from "./Images/GreenBin.jpg";
import { Routes, Route } from 'react-router-dom';
import { Form, BinData } from './pages';


function App() {
  return (
  <div>
    <Routes>
      <Route path="/" element={<Form />}/>
      <Route path="/CurrentCollection" element={<BinData />}/>
    </Routes>
  </div>);
}

export default App;