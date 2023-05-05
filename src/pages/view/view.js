import * as THREE from "three"
import "./view.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// my imports
import brightnessCalc from "./brightnesscalc"

// setting up some basics for THREE
const clock = new THREE.Clock();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();


// Starts the scene itself
const object = JSON.parse(localStorage.getItem("sceneData"))
const textureDay = textureLoader.load(object.planetFile);
const textureNight = textureLoader.load('../img/8k_earth_nightmap.jpg');


// Objects/textures
//    The galaxy/space background
const outside = new THREE.SphereGeometry(object.distanceFromSun*15, 64, 64);
const outsideMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load('/img/big_galaxy.jpg'),
  side: THREE.BackSide,//THREE.DoubleSide, // TODO can i get better preformance rendering "back"/inside?
});
const space = new THREE.Mesh(outside,outsideMat);
scene.add(space)

const planetGeometry = new THREE.SphereGeometry(object.planetSize, 64, 64, );


// pull this logic into its own file.... and can remove the let planetTexture = null
// pass in object.isEarth and object.planetFile
let planetTexture = null;
if (object.isEarth){
  planetTexture = new THREE.MeshPhongMaterial({
    map: textureDay,
    bumpMap: textureLoader.load("../img/2k_earth_normal_map.jpg"),
    bumpScale: 0.5,
    specularMap: textureLoader.load("../img/2k_earth_specular_map.jpg"),
    shininess: 0.5,
  });
}else{
  planetTexture = new THREE.MeshStandardMaterial({
    map: textureLoader.load(object.planetFile)
  });
}


const planet = new THREE.Mesh(planetGeometry, planetTexture);
planet.rotation.z = object.tilt
planet.position.x = object.distanceFromSun;
scene.add(planet);


const sun = new THREE.SphereGeometry(object.sunSize, 64, 64, );
const brightness = brightnessCalc(object.luminosity)


// from here  \/ \/    // can compress all this into one line, or pair down. sun is special stuff:
if (object.ourSun){
  object.sunColor = '#FDB813',
  console.log("its our sun, so here we use #FDB813, in space, the sun is actually white #FFFFFF, ppl wouldn't like if i showed it this way though")
}
const sunTexture = object.ourSun ? new THREE.MeshStandardMaterial({
  emissiveMap: textureLoader.load("../img/2k_sun.jpg"),
  emissiveIntensity: brightness,
  emissive: 0xFFFFFF,
}) : new THREE.MeshStandardMaterial({
  emissiveMap: textureLoader.load("../img/2k_sun_grey.png"),
  emissiveIntensity: brightness,
  emissive: object.sunColor,
}); new THREE.MeshBasicMaterial({color: object.sunColor,}); 
// until here /\ /\

const meshSun = new THREE.Mesh(sun, sunTexture);
scene.add(meshSun);



const light = new THREE.PointLight(object.sunColor, 0.9 + brightness*.4, object.distanceFromSun*2);//todo sun color
scene.add(light);
const light_stars = new THREE.PointLight(0xFFFFFF, .15)// not dependent on sun
scene.add(light_stars)
//const ambientLight = new THREE.AmbientLight(0xFFFFFF, .15)
//scene.add(ambientLight)



// camera (titan)
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
