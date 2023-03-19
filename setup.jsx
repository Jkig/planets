import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { useState } from 'react'

function App() {
    const [data, setData] = useState({
        ourSun: true,
        mass: 1,
        earth: false,
        distanceFromPlanet: 10,// in planet radii
        distanceFromSun: 1,// in AU
    });

    const handleChangeMass = e => {
        // take a 1-100 and put trough exponential
        let massSM = null
        if (e.target.value == 50){
            setData({...data, mass: 1});
        }else{
            if (e.target.value < 50){
                massSM = e.target.value/50
            }else{
                massSM = (e.target.value-50)*4
            }
            setData({...data, mass: massSM});
        }
      };

    const handleChangeSun = e =>{
        setData({...data, ourSun: e.target.checked})
    }

    const handleChangePlanet = e =>{
        setData({...data, earth: e.target.checked})
    }

    const handleChangePlanetDistance = e =>{
        setData({...data, distanceFromSun: e.target.value/10})
    }
    // calculate, special case for sun.., iff 1 solar mas on slider, then set on calculate
    // orbit length calculated from orbits and junk ez (mass doesn't matter)
    // 1.496e8 // au to km,
    // useeffect to set some things
    // TODO useeffect to show things (earth radii, etc, re load things when needed)

    // store habitable zone in the local object, and use useeffect to update habitable zone
    const handleChangeDistance = e =>{
        setData({...data, distanceFromPlanet: e.target.value})
    }

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

                <li>
                    <ul className='horizontal'>
                        <li className='horizontali'>Just use our sun!</li>
                        <li className='horizontali'>
                            <label className="container">
                                <input type="checkbox" defaultChecked="true" onClick={handleChangeSun}/>
                                <span className="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </li>

                {!data.ourSun && <li>
                    <div className='horizonatali'>Size of star</div>
                    <div className="slidecontainer">
                        <input type="range" min="5" max="100" className="slider" id="myRange" onChange={handleChangeMass}/>
                        {data.mass} Solar mass{(data.mass !== 1) && 'es'}
                    </div>
                </li>}

                <li>
                    <div className='horizonatali'>Distance from the sun, habitable zone bounds are habitable zone</div>
                    <div className="slidecontainer">
                        <input type="range" min="4" max="100" className="slider" id="myRange" onChange={handleChangePlanetDistance}/>
                        {data.distanceFromSun} AU
                    </div>
                </li>
                <li>
                    <div className='horizonatali'>Distance from planet</div>
                    <div className="slidecontainer">
                        <input type="range" min="2" max="200" className="slider" id="myRange" onChange={handleChangeDistance}/>
                        {data.distanceFromPlanet} planet radii
                    </div>
                </li>
                <li>
                <button className="createButton" type="submit">Calculate</button>
                </li>
            </ul>
            <a className="link" href="view.html"><h1>View your system!</h1></a>
        </div>
    )
    // probably have all this stuff in a form, then build json and make local storage of it
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

