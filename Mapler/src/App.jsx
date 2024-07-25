import React from 'react';
import './App.css';
import { Leaflet } from './Components/Leaflet/Leafet.jsx'
import { Gemini } from './Components/Gemini/Gemini.jsx';

function App() {
    return (
      <div className='container'>
        <div className="data-container">
            <div className="left">
                <div className="gemini">
                    <h1 className='maplet-head'>Maplet</h1>
                    <Gemini />
                    <p className='mark'>Created by Muqeem Malik using Leaflet, Gemini & OpenStreetMap</p>
                </div>
            </div>
            <div className="right">
                <Leaflet />
            </div>
        </div>
        </div>
    );
}

export default App;
