import * as THREE from "three"
import "./style.css"
import { FirstPersonControls } from "../planets/FirstPersonControls";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import * as dat from "dat.gui";

import jupiterImage from '/img/2k_jupiter.jpg';
import galaxy from '/img/big_galaxy.jpg';

// TODO:
/*
* spacebar or something to toggle look around, its weird????? idk yet
* update imorted constans as a dictunary
*/

// master speed scales eveything, so other values can be ported in ezier
let speed = .005
// let scale size = .01 //if this is more preformant??

// time values in seconds (change to a dictinary later)
let jupiterDayLength_preScale = 35609
let jupiterYearLength_preScale = 374371200
let europaOrbitLenght_preScale = 306000
// europa is tidally locked
// post scale:
let jupiterDayLength = jupiterDayLength_preScale*speed
let jupiterYearLength = jupiterYearLength_preScale*speed
let europaOrbitLenght = europaOrbitLenght_preScale*speed
// all units in km, i'll see if that needs to be optimized...
let distanceFromSun = 778000000;
let jupiterSize = 69911;
let europaOrbit = 671000;
let sunSize = 1400000;


// setting up some basics
const clock = new THREE.Clock();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);
document.body.appendChild(renderer.domElement)
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
  map: textureLoader.load(jupiterImage)
});
const meshJupiter = new THREE.Mesh(jupiter, jupiterTexture);
meshJupiter.rotation.z = 0.05462881
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

const controls = new FirstPersonControls(camera,renderer.domElement);
controls.movementSpeed = 0;
controls.lookSpeed = .1
controls.update(clock.getDelta());



function animate(time) {

  /* only if testing with gui??*/
  jupiterDayLength = jupiterDayLength_preScale*speed
  jupiterYearLength = jupiterYearLength_preScale*speed
  europaOrbitLenght = europaOrbitLenght_preScale*speed


  meshJupiter.rotation.y = time / jupiterDayLength;
  
  meshJupiter.position.z = distanceFromSun*Math.cos(time/jupiterYearLength)
  meshJupiter.position.x = distanceFromSun*Math.sin(time/jupiterYearLength)

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

