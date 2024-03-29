import * as THREE from "three"

export default function buildPlanetTexture(object, textureLoader) {
    const textureDay = textureLoader.load(object.planetFile);
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
    return planetTexture
}