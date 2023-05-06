import * as THREE from "three"
import sunMaker from "./sunMaker";

export default function buildScene(object, textureLoader) {
    // handles Lighting, space, and the sun
    const scene = new THREE.Scene();

    const outside = new THREE.SphereGeometry(object.distanceFromSun*15, 64, 64);
    const outsideMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load('/img/big_galaxy.jpg'), side: THREE.BackSide,});
    scene.add(new THREE.Mesh(outside,outsideMat))

    scene.add(sunMaker(object, textureLoader));

    const light = new THREE.PointLight(object.ourSun ? '#FFFFFF' : object.sunColor, 0.9 + object.brightness*.4, object.distanceFromSun*2);
    scene.add(light);
    const light_stars = new THREE.PointLight(0xFFFFFF, .15)// not dependent on sun
    scene.add(light_stars)
    return scene
}