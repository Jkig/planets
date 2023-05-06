import * as THREE from "three"
import "./view.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import buildScene from "./buildScene";
import buildPlanetTexture from "./buildPlanetTexture";



const clock = new THREE.Clock();
const sizes = { width: window.innerWidth, height: window.innerHeight,};
const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg"), })
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);


const object = JSON.parse(localStorage.getItem("sceneData"))
const scene = buildScene(object, textureLoader)


const planetGeometry = new THREE.SphereGeometry(object.planetSize, 128, 128, );
const planet = new THREE.Mesh(planetGeometry, buildPlanetTexture(object, textureLoader));
planet.rotation.z = object.tilt
planet.position.x = object.distanceFromSun;
scene.add(planet);


const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 3*object.distanceFromSun);
camera.position.z = object.cameraOrbit;
camera.position.x = object.distanceFromSun;
scene.add(camera);


const controls = new OrbitControls(camera,renderer.domElement);
const posiotion_center = new THREE.Vector3( object.distanceFromSun, 0, 0 );
controls.target = posiotion_center;
controls.update(clock.getDelta());


function animate(time) {
  requestAnimationFrame(animate);
  planet.rotation.y = time / object.planetDayLength;
  if (object.isCameraOrbit){
    camera.position.z = planet.position.z+object.cameraOrbit*Math.cos(time/object.cameraOrbitLength);
    camera.position.x = planet.position.x+object.cameraOrbit*Math.sin(time/object.cameraOrbitLength);
  }
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
};
animate();

// wonder if this is expensive, can limit how many times it checks for preformance if i need
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
