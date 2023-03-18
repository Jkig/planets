import * as THREE from "three"
import "./style.css"
// import { FirstPersonControls } from "../planets/FirstPersonControls";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from "dat.gui";

import galaxy from '/img/big_galaxy.jpg';

import object from "./basicScene.json";


import jupiterImage from '/img/2k_jupiter.jpg';
import earthImage from '/img/8k_earth_daymap.jpg';

let surface = null

if (object.planetFile !== '/img/2k_jupiter.jpg'){
  surface = jupiterImage
}else{
  surface = earthImage
}




let speed = .01



let jupiterDayLength_preScale = object.daylength
//let jupiterYearLength_preScale = object.yearlength
let europaOrbitLenght_preScale = object.orbitLenght

let distanceFromSun = object.distanceFromSun
let jupiterSize = object.planetSize
let europaOrbit = object.cameraOrbit
let sunSize = object.sunSize


let jupiterDayLength = jupiterDayLength_preScale*speed
//let jupiterYearLength = jupiterYearLength_preScale*speed
let europaOrbitLenght = europaOrbitLenght_preScale*speed


// setting up some basics
const clock = new THREE.Clock();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
//const renderer = new THREE.WebGLRenderer(); // old, worked
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);

//document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

// adding objects/textures
const outside = new THREE.SphereGeometry(distanceFromSun*15, 64, 64);
const outsideMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(galaxy),
  side: THREE.DoubleSide,
});
const fullOutside = new THREE.Mesh(outside,outsideMat);
scene.add(fullOutside)

const jupiter = new THREE.SphereGeometry(jupiterSize, 64, 64, );
const jupiterTexture = new THREE.MeshStandardMaterial({
  // color: '#FF8C00',
  map: textureLoader.load(surface)
});
const meshJupiter = new THREE.Mesh(jupiter, jupiterTexture);
meshJupiter.rotation.z = object.tilt
meshJupiter.position.x = distanceFromSun;
scene.add(meshJupiter);

const sun = new THREE.SphereGeometry(sunSize, 64, 64, );
const sunTexture = new THREE.MeshBasicMaterial({ color: '#FDB813', });
const meshSun = new THREE.Mesh(sun, sunTexture);
scene.add(meshSun);


// const light = new THREE.PointLight(0xFDB813, 1.7, distanceFromSun*2); // because the true color is white in space lol
const light = new THREE.PointLight(0xFFFFFF, 1.7, distanceFromSun*2);
scene.add(light);
const backgroundLight = new THREE.PointLight(0xFFFFFF, .15)
scene.add(backgroundLight)



// camera (titan)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1778000000);
camera.position.z = europaOrbit;
camera.position.x = distanceFromSun;
scene.add(camera);

//const controls = new FirstPersonControls(camera,renderer.domElement);
//controls.movementSpeed = 0;
//controls.lookSpeed = .1
const controls = new OrbitControls(camera,renderer.domElement);
controls.movementSpeed = 0;
controls.lookSpeed = .1
const posiotion_center = new THREE.Vector3( distanceFromSun, 0, 0 );
controls.target = posiotion_center;
//controls.target = meshJupiter.positio

controls.update(clock.getDelta());

/*
const gui = new dat.GUI();
const options = {
  speed: .005
};
gui.add(options, 'speed', 0, .01).onChange(function(e){
  console.log(`${options.speed}`)
});
*/


function animate(time) {

  meshJupiter.rotation.y = time / jupiterDayLength;
  
  /* // unneccisary lol, irl we should be doing one or the other
  meshJupiter.position.z = distanceFromSun*Math.cos(time/jupiterYearLength)
  meshJupiter.position.x = distanceFromSun*Math.sin(time/jupiterYearLength)
  */

  camera.position.z = meshJupiter.position.z+europaOrbit*Math.cos(time/europaOrbitLenght);
  camera.position.x = meshJupiter.position.x+europaOrbit*Math.sin(time/europaOrbitLenght);


  controls.update(clock.getDelta());
  renderer.render(scene, camera);

};
renderer.setAnimationLoop(animate);




/*
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop()
*/

