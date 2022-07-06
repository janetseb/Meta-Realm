import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";


import logo from './logo.svg';
import './App.css';

import Home from './pages/Home';
import Landmap from './pages/Landmap';
import Profile from './pages/Profile';
import SaleList from './pages/SaleList';
import Meta from './pages/Meta'

function App() {
  return (
    // <div className="App">
      <BrowserRouter>
      <Routes>  
            <Route path="/" element={<Home/>} />  
            <Route path="/Landmap"  element={<Landmap/>} />  
            <Route path="/Profile"  element={<Profile/>} />  
            <Route path="/SaleList" element={<SaleList/>} />  
            <Route path="/Meta" element={<Meta/>} />  
      </Routes>
      </BrowserRouter>
    // </div>
  );
}

export default App;
