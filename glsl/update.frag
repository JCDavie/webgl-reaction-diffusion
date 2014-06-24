#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;
uniform vec2 range;

vec4 get(vec2 offset) {
    return texture2D(state, (gl_FragCoord.xy + offset) / scale);
}

float unpack( vec4 c ) {
    // convert 4 x float8 [0,1] to float32 [0,1]
    return c.x + c.y / 256.0 + c.z / 65536.0 + c.w / 16777216.0;
}

vec4 pack( float val ) {
    // convert float32 [0,1] to 4 x float8 [0,1]
    float x = mod( floor( val * 256.0 ) / 256.0, 1.0 );
    float y = mod( floor( val * 256.0 * 256.0 ) / 256.0, 1.0 );
    float z = mod( floor( val * 256.0 * 256.0 * 256.0 ) / 256.0, 1.0 );
    float w = mod( floor( val * 256.0 * 256.0 * 256.0 * 256.0 ) / 256.0, 1.0 );
    return vec4( x, y, z, w );
}

float to_range( float val ) {
    // convert [0,1] to [range.x,range.y]
    return val * ( range.y - range.x ) + range.x;
}

float from_range( float val ) {
    // convert [range.x,range.y] to [0,1]
    return ( val - range.x ) / ( range.y - range.x );
}

void main() {
    float c = to_range( unpack( get( vec2( 0.0, 0.0 ) ) ) );
    float e = to_range( unpack( get( vec2( -1.0, 0.0 ) ) ) );
    float w = to_range( unpack( get( vec2( 1.0, 0.0 ) ) ) );
    float n = to_range( unpack( get( vec2( 0.0, -1.0 ) ) ) );
    float s = to_range( unpack( get( vec2( 0.0, 1.0 ) ) ) );
    
    float laplacian = n + e + s + w - 4.0 * c;
    float timestep = 0.1;
    
    float delta = laplacian + c - c*c*c;
    
    gl_FragColor = pack( from_range( c + timestep * delta ) );
}
