import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import NavBar from './Components/Navbar';

function App() {
  return (
    <div className="App">
        <NavBar/>
        <Home/>
    </div>
  );
}

export default App;
