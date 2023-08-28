const vertexShader = `
  uniform mat4 modelMatrix;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;



const fragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec3 lightDirection;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec4 color1 = texture2D(dayTexture, vUv);
    vec4 color2 = texture2D(nightTexture, vUv);

    float NdotL = dot(vWorldNormal, -lightDirection);
    float lightLevel = (NdotL + 1.0) * 0.5;

    float mixValue = clamp(lightLevel, 0.0, 1.0);
    vec4 finalColor = mix(color2, color1, mixValue);

    gl_FragColor = finalColor;
  }
`;


export { vertexShader, fragmentShader }