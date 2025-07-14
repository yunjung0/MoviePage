import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { signup } from './api/SignupApi';
import Main from "./pages/Main";
//import api from "./api/Api"
import Signup from './components/Signup';
import Login from './components/Login';
import Navigationbar from './components/Navigation';
import Detail from "./pages/Detail";

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path='/signupPage' element= {<Signup />} />
        <Route path='/loginPage' element= {<Login />} />
      </Routes>
    </div>
  );
}

export default App;
