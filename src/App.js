import React from "react";
import './App.css';
import './BinDataFunctions.js';
import { Routes, Route } from 'react-router-dom';
import { FutureCollections, Heading, Home, UserInfo, BinData, Alerts, BlueBinContents, BrownBinContents, BlackBinContents, GreenBinContents } from './pages';


function App() {
  return (
  <div className="App">
    <Heading />
    {/* <Alerts /> */}
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/CurrentCollection" element={<BinData />}/>
      <Route path="/YourInfo" element={<UserInfo />}/>
      <Route path="/FutureCollections" element={<FutureCollections />}/>
      <Route path="/GreenBinContents" element={<GreenBinContents />}/>
      <Route path="/BlackBinContents" element={<BlackBinContents />}/>
      <Route path="/BrownBinContents" element={<BrownBinContents />}/>
      <Route path="/BlueBinContents" element={<BlueBinContents />}/>
    </Routes>
  </div>);
}

export default App;