import * as THREE from "three"
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// TODO swap from orbit control to the oposite, fixed cam position and variable look
import { Vector3 } from "three";


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

// scene
const scene = new THREE.Scene();
// gemetry
//    jupiter
const jupiter = new THREE.SphereGeometry(jupiterSize, 4, 4, );//69911, 64, 64);
const jupiterTexture = new THREE.MeshStandardMaterial({ color: '#FF8C00', });
//const jupiter = new THREE.BoxGeometry(jupiterSize, 64, 64, );//69911, 64, 64);
//const jupiterTexture = new THREE.MeshBasicMaterial({ color: '#FF8C00', });
const meshJupiter = new THREE.Mesh(jupiter, jupiterTexture);
scene.add(meshJupiter);
//    sun
const sun = new THREE.SphereGeometry(sunSize, 64, 64, );//69911, 64, 64);
const sunTexture = new THREE.MeshBasicMaterial({ color: '#FDB813', });
const meshSun = new THREE.Mesh(sun, sunTexture);
scene.add(meshSun);
//    moon


meshJupiter.position.x = distanceFromSun;


// Light
const light = new THREE.PointLight(0xFDB813, 2);
light.position.set(5000, 0, 0 );// TODO this as part of set up for movement
scene.add(light);

// camera (titan)
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1778000000);
camera.position.z = europaOrbit;
camera.position.x = distanceFromSun;
scene.add(camera);


const orbit = new OrbitControls(camera,renderer.domElement);
const posiotion_center = new THREE.Vector3( distanceFromSun, 0, 0 );
orbit.target = posiotion_center;

orbit.update();

// animate turn
function animate(time) {
  meshJupiter.rotation.y = time / 500;
  renderer.render(scene, camera);
  orbit.update();
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