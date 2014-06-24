#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

vec4 get(vec2 offset) {
    return texture2D(state, (gl_FragCoord.xy + offset) / scale);
}

void main() {
    gl_FragColor = ( get( vec2( -1.0, 0.0) ) + get( vec2( 0.0, 0.0 ) ) + get( vec2( 1.0, 0.0 ) ) ) / 3.0;
}
