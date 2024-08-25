const TestShader: THREE.Shader = {
    uniforms: {
        zoom: {
            value: 1.0,
        },
        zoomLevel: {
            value: 1.0,
        },
        ratio: {
            value: 0.0,
        },
        target: {
            value: [0.5, 0.5]
        },
        map: {
            value: null,
        }
    },
    vertexShader:
/* glsl */
`
    uniform float zoom;
    uniform float zoomLevel;
    uniform float ratio;
    uniform vec2 target;    

    varying vec2 vUv;
    void main() {
        vUv = uv * zoom + (1.0 - zoom) * target * 8.0 / 7.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
    fragmentShader:
/* glsl */
`
    varying vec2 vUv;
    uniform sampler2D map;

    void main() {
        //float grid = 0.5;
        //if(mod(vUv.x, 0.25) < 0.125) {
        //    grid = 0.5 - grid;
        //}
        //if(mod(vUv.y, 0.25) < 0.125) {
        //    grid = 0.5 - grid;
        //}
        //grid += 0.5;
        gl_FragColor = texture2D(map, vUv);
    }`
}

export { TestShader }