const SelectionShader = {
    uniforms: {
        selected: {
            value: false,
        },
    },
    code:
/* glsl */
`
    uniform bool selected;

    vec4 applyShader(vec4 inputColor, vec2 frameUv) {
        if(!selected || inputColor.a > 0.5) {
            return inputColor;
        }
        vec4 surrounding = vec4(0.0, 0.0, 0.0, 0.0);
        vec2 corner1 = pixelSize;
        vec2 corner2 = vec2(corner1.x, -corner1.y);
        surrounding += texture2D(map, frameUv + corner1);
        surrounding += texture2D(map, frameUv - corner1);
        surrounding += texture2D(map, frameUv + corner2);
        surrounding += texture2D(map, frameUv - corner2);
        return vec4(1.0, 1.0, 1.0, surrounding.a);
    }`
};

export { SelectionShader }