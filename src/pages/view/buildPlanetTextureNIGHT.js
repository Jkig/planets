import * as THREE from "three"

export default function buildPlanetTextureNIGHT(object, textureLoader) {
    //const textureDay = textureLoader.load(object.planetFile);
    const textureNight = textureLoader.load('../img/8k_earth_nightmap.jpg');


    // pull planetTexture into its own file, then i can experiment with it, pass ot texture loader and object only
    let planetTexture = null;
    if (object.isEarth){
    planetTexture = new THREE.MeshStandardMaterial({
        map: textureNight,
        bumpMap: textureLoader.load("../img/2k_earth_normal_map.jpg"),
        bumpScale: 0.5,
        // specularMap: textureLoader.load("../img/2k_earth_specular_map.jpg"),
        // shininess: 0.5,
        emissive: "#ffe692",
        emissiveMap: textureNight,
        emissiveIntensity: .8,
    });
    }else{
    planetTexture = new THREE.MeshStandardMaterial({
        map: textureLoader.load(object.planetFile)
    });
    }
    return planetTexture
}