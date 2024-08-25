const VignetteShader: THREE.Shader = {
    uniforms: {
        intensity: {
            value: 1.0,
        },
    },
    vertexShader:
/* glsl */
`
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    fragmentShader:
/* glsl */
`
    varying vec2 vUv;
    uniform sampler2D map;

    void main() {
        vec2 dist = (vUv - vec2(0.5, 0.5));
        float alpha = dist.x * dist.x + dist.y * dist.y;
        gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
    }`

}

export { VignetteShader }