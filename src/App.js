import React from "react";
import './App.css';
import './BinDataFunctions.js';
import { Routes, Route } from 'react-router-dom';
import { FutureCollections, Heading, Home, UserInfo, BinData } from './pages';


function App() {
  return (
  <div className="App">
    <Heading />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/CurrentCollection" element={<BinData />}/>
      <Route path="/YourInfo" element={<UserInfo />}/>
      <Route path="/FutureCollections" element={<FutureCollections />}/>
    </Routes>
  </div>);
}

export default App;