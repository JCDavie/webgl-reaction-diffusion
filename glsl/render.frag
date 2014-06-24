#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

void main() {
    float val = texture2D(state, gl_FragCoord.xy / scale).x;
    gl_FragColor = vec4( val, 0, 0, 1.0 );
}
