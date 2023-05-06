import * as THREE from "three"

export default function sunMaker(object, textureLoader) {
    const sun = new THREE.SphereGeometry(object.sunSize, 32, 32, );

    if (object.ourSun){
    object.sunColor = '#FDB813',
    console.log("In space, the sun is actually white #FFFFFF, but we are used to its yellow color #FDB813")
    }
    const sunTexture = object.ourSun ? new THREE.MeshStandardMaterial({
    emissiveMap: textureLoader.load("../img/2k_sun.jpg"),
    emissiveIntensity: object.brightness,
    emissive: 0xFFFFFF,
    }) : new THREE.MeshStandardMaterial({
    emissiveMap: textureLoader.load("../img/2k_sun_grey.png"),
    emissiveIntensity: object.brightness,
    emissive: object.sunColor,
    }); // new THREE.MeshBasicMaterial({color: object.sunColor,}); 
    const meshSun = new THREE.Mesh(sun, sunTexture);

    return meshSun
}

