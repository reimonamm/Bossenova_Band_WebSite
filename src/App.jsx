import React from 'react';
import StageCanvas from "./components/StageCanvas.jsx";
import {positions} from "./data/positions.js";
import  './styles/index.css';


const App = () => {

    return (
        <div style={{ width: '100%' , height: '100%' }}>
            <StageCanvas positions={positions} />
        </div>
    )
};
export default App;