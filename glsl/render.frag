#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;
uniform vec2 range;

float to01( float val ) {
    return ( val - range.x ) / ( range.y - range.x );
}

void main() {
    float val = texture2D(state, gl_FragCoord.xy / scale).x;
    float mapped_val = to01( val );
    gl_FragColor = vec4( mapped_val, 0, 0, 1.0 );
}
