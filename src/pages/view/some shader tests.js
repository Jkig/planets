const dayTexture = buildPlanetTexture(object, textureLoader);
const nightTexture = buildPlanetTextureNIGHT(object, textureLoader);

import { vertexShader, fragmentShader } from "./shaders";
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    dayTexture: { value: textureLoader.load('../img/8k_earth_daymap.jpg') },//dayTexture },
    nightTexture: { value: textureLoader.load('../img/8k_earth_nightmap.jpg') },//nightTexture },
    lightDirection: { value: new THREE.Vector3(0, 0, 1).normalize() },
    modelMatrix: { value: new THREE.Matrix4() },
  },
});

// in animation loop
material.uniforms.modelMatrix.value = planet.matrixWorld;
