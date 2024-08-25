const LoadingShader = {
    uniforms: {
        percentage: {
            value: 0.0,
        },
    },
    code:
/* glsl */
`
    uniform float percentage;

    vec4 applyShader(vec4 inputColor, vec2 frameUv) {
        float factor = 1.0;
        if(frameUv.y > percentage) {
            factor = 0.5;
        }
        return factor * inputColor;
    }`
};

export { LoadingShader }