#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;
uniform vec2 range; // ( low, high )

float from01( float val ) {
    return val * ( range.y - range.x ) + range.x;
}

float to01( float val ) {
    return ( val - range.x ) / ( range.y - range.x );
}

vec4 get(vec2 offset) {
    return texture2D(state, (gl_FragCoord.xy + offset) / scale);
}

void main() {
    gl_FragColor = ( get( vec2( -1.0, 0.0) ) + get( vec2( 0.0, 0.0 ) ) + get( vec2( 1.0, 0.0 ) ) ) / 3.0;
}
