import React from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'

function App() {
    // useState

    // have sliders, each move sets state, then recalcs other stuff, if outside habitable don't let continue
    // a final button to submit then href??, or auto update local storage with state, then  href takes there? however...
    return (
        <div>
            <h1>Basic junk here </h1>
            <ul>
                <li><ul><li>star mass in au</li><li>oursun</li></ul></li>
                <li>planet</li>
                <li>distance from planet</li>
                <li>choose distance from sun __and we give them info about habitable zones already, just luminosity calc__</li>
            </ul>
            <a href="view.html">and here should be navigate to the view page</a>
        </div>
    )
    // probably have all this stuff in a form, then build json and make local storage of it
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

