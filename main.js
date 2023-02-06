import * as THREE from "three"
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import jupiterImage from '/img/2k_jupiter.jpg';
import galaxy from '/img/big_galaxy.jpg';


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);
document.body.appendChild(renderer.domElement)

// all units in km, i'll see if that needs to be optimized...
let distanceFromSun = 778000000;
let jupiterSize = 69911;
let europaOrbit = 671000;
let sunSize = 1400000;

const scene = new THREE.Scene();
//    jupiter
const textureLoader = new THREE.TextureLoader();

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

scene.add(meshJupiter);
//    sun
const sun = new THREE.SphereGeometry(sunSize, 64, 64, );
const sunTexture = new THREE.MeshBasicMaterial({ color: '#FDB813', });
const meshSun = new THREE.Mesh(sun, sunTexture);
scene.add(meshSun);
//    moon


meshJupiter.position.x = distanceFromSun;


// Light
const light = new THREE.PointLight(0xFDB813, 1.7, distanceFromSun*2);
//light.position.set(0, 0, 0 );// TODO this as part of set up for movement
scene.add(light);

const backgroundLight = new THREE.PointLight(0xFFFFFF, .15)
scene.add(backgroundLight)

// camera (titan)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1778000000);
camera.position.z = europaOrbit;
camera.position.x = distanceFromSun;
scene.add(camera);


const orbit = new OrbitControls(camera,renderer.domElement);
// const posiotion_center = new THREE.Vector3( distanceFromSun, 0, 0 );
//orbit.target = posiotion_center;
orbit.target = meshJupiter.position


orbit.update();

// animate turn and orbit
function animate(time) {
  meshJupiter.rotation.y = time / 1000;
  renderer.render(scene, camera);
  orbit.update();

  /*
  meshJupiter.position.z = distanceFromSun*Math.cos(time/2000)
  meshJupiter.position.x = distanceFromSun*Math.sin(time/2000)
  orbit.target = meshJupiter.position
  */

};
renderer.setAnimationLoop(animate);



//renderer.render(scene, camera);



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