#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

vec4 get(vec2 offset) {
    return texture2D(state, (gl_FragCoord.xy + offset) / scale);
}

float unpack( vec4 c ) {
    // convert 4x[0,1] (were stored as bytes) to [0,1]
    return c.x + c.y / 256.0 + c.z / 65536.0 + c.w / 16777216.0;
}

vec4 pack( float val ) {
    // convert [0,1] to 4x[0,1] (to be stored as bytes)
    float x = mod( floor( val * 256.0 ) / 256.0, 1.0 );
    float y = mod( floor( val * 256.0 * 256.0 ) / 256.0, 1.0 );
    float z = mod( floor( val * 256.0 * 256.0 * 256.0 ) / 256.0, 1.0 );
    float w = mod( floor( val * 256.0 * 256.0 * 256.0 * 256.0 ) / 256.0, 1.0 );
    return vec4( x, y, z, w );
}

void main() {
    float c = unpack( get( vec2( 0.0, 0.0 ) ) );
    float e = unpack( get( vec2( -1.0, 0.0 ) ) );
    float w = unpack( get( vec2( 1.0, 0.0 ) ) );
    
    float new_val = ( c + e + w ) / 3.0; // simple horizontal blur
    
    gl_FragColor = pack( new_val );
}
