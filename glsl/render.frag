#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

void main() {
    float val = texture2D(state, gl_FragCoord.xy / scale).x; // only need 256 levels so can just take first byte
    gl_FragColor = vec4( val, val, val, 1.0 );
}
