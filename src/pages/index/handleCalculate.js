
import earthScene from "./earthScene.json";
import basicScene from "./basicScene.json";

import { justLuminosity, starProperties } from "./physicsCalculations"
import brightnessCalc from './brightnesscalc';

export default function handleCalculate(data) {
    let sceneObject = null
    // now set everything else
    if (data.earth){
        sceneObject = earthScene
        // earth constant:
        const earthGravitational = 3.147147566443759e-7;

        sceneObject.orbitLength = Math.sqrt(Math.pow(data.distanceFromPlanet*sceneObject.planetSize*1000, 3))*earthGravitational;
    }else{
        sceneObject = basicScene
        // jupiter constant:
        const jupiterGravitational = 1.764877328242383e-8;
        // then multiply by sqrt(r^3), r = planetradius*distanceFromPlanet
        sceneObject.orbitLength = Math.sqrt(Math.pow(data.distanceFromPlanet*sceneObject.planetSize*1000, 3))*jupiterGravitational;
    }
    const starInfo = starProperties(data.mass);
    if (!data.ourSun){
    // sun properties (size/color)
        sceneObject.ourSun = false
        sceneObject.sunColor = starInfo.color
        sceneObject.sunSize = starInfo.radius/1000
    }
    sceneObject.distanceFromSun = 149600000*data.distanceFromSun;

    if (sceneObject.distanceFromSun <= sceneObject.sunSize){
        window.alert("You are in the sun, so it won't show up")
    }

    sceneObject.cameraOrbit = sceneObject.planetSize*data.distanceFromPlanet;
    sceneObject.isCameraOrbit = data.orbiting;
    sceneObject.luminosity = starInfo.luminosity
    sceneObject.planetDayLength = sceneObject.daylength*sceneObject.speed
    sceneObject.cameraOrbitLenght = sceneObject.orbitLenght*sceneObject.speed

    sceneObject.brightness = brightnessCalc(sceneObject.luminosity)
    sceneObject.night = data.night
    
    localStorage.clear();
    localStorage.setItem("sceneData", JSON.stringify(sceneObject));
}