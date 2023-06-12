import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import './index.css';

import initializeData from "./initializeData.json"

import { justLuminosity } from "./physicsCalculations"
import handleCalculate from "./handleCalculate"


function App() {
    const [data, setData] = useState(initializeData);

    const handleChangePlanet = e =>{ setData({...data, earth: e.target.checked}) }
    const handleChangeNight = e =>{ setData({...data, night: e.target.checked}) }
    const handleChangeSun = e =>{ setData({...data, ourSun: e.target.checked}) }
    const handleChangeDistance = e =>{ setData({...data, distanceFromPlanet: Number(e.target.value)}) }
    const handleChangeOrbit = e => { setData({...data, orbiting: e.target.checked}) }

    const handleChangePlanetDistance = e =>{
        let dist = null
        if (e.target.value == 100){
            setData({...data, distanceFromSun: 1});
        }else{
            if (e.target.value < 100){
                dist = e.target.value/100
            }else{
                dist = (e.target.value-99)
            }
            setData({...data, distanceFromSun: dist});
        }
    }

    const handleChangeMass = e => {
        let massSM = null
        if (e.target.value == 50){
            setData({...data, mass: 1});
        }else{
            if (e.target.value < 50){
                massSM = e.target.value/50
            }else{
                massSM = (e.target.value-50)*4
            }
            let lumin = justLuminosity(massSM)
            setData({...data, mass: massSM, closest: Math.sqrt(lumin/(3.828e26))*.75, furthest: Math.sqrt(lumin/(3.828e26))*1.1});
        }
    };

    return (
        <div className='main'>
            <h1>Build the system</h1>
            <ul>
                <li>
                    <ul className='horizontal'>
                        <li className='horizontali'>Earth</li>
                        <li className='horizontali'>
                            <label className="container">
                                <input type="checkbox" onClick={handleChangePlanet}/>
                                <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </li>
                {data.earth && <ul className='horizontal'>
                        <li className='horizontali'>Earth at Night</li>
                        <li className='horizontali'>
                            <label className="container">
                                <input type="checkbox" onClick={handleChangeNight}/>
                                <span className="checkmark"></span>
                            </label>
                        </li>
                </ul>}
                <li>
                    <ul className='horizontal'>
                        <li className='horizontali'>Just use our sun</li>
                        <li className='horizontali'>
                            <label className="container">
                                <input type="checkbox" defaultChecked="true" onClick={handleChangeSun}/>
                                <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </li>
                {!data.ourSun && <li>
                    <div>Size of star</div>
                    <div className="slidecontainer">
                        <input type="range" min="4" max="100" className="slider" id="myRange" onChange={handleChangeMass}/>
                        {data.mass} Solar mass{(data.mass !== 1) && 'es'}
                    </div>
                </li>}
                <li>
                    <div className="slidecontainer">
                        <ul>
                            <li className='horizontali'>Distance from the sun:</li>
                            <li className='horizontali'>{data.distanceFromSun}AU</li>
                            <li className='horizontali'>Habitable from {Math.round(data.closest * 100) / 100} to {Math.round(data.furthest * 100) / 100}</li>
                        </ul>
                        <input type="range" min="10" max="200" className="slider" id="myRange" defaultValue={100} onChange={handleChangePlanetDistance}/>
                    </div>
                </li>
                <li>
                    <div>Distance from planet: {data.distanceFromPlanet} planet radii </div>
                    <div className="slidecontainer">
                        <input type="range" min="2" max="200" className="slider" id="myRange" onChange={handleChangeDistance}/>
                    </div>
                </li>
                <li>
                    <ul className='horizontal'>
                        <li className='horizontali'>Orbit automatically</li>
                        <li className='horizontali'>
                            <label className="container">
                                <input type="checkbox" onClick={handleChangeOrbit}/>
                                <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </li>
                <li>
                    <button className="createButton" type="submit" onClick={() => handleCalculate(data)}>
                        <a href="view.html" className="link">View your system!</a>
                    </button>
                </li>
            </ul>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
