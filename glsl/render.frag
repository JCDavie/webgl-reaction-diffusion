#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

float unpack( vec4 c ) {
    // convert 4x[0,1] (stored as bytes) to [0,1]
    return c.x + c.y / 256.0 + c.z / 65536.0 + c.w / 16777216.0;
}

void main() {
    vec4 c = texture2D(state, gl_FragCoord.xy / scale);
    float val = unpack( c );
    gl_FragColor = vec4( val, val, val, 1.0 );
}
