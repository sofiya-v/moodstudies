#version 300 es
precision highp float;
precision highp int;

// Readable translation of examples/Reactive.hs. See webgl-shaders.md.
uniform vec2 u_resolution; // Drawing-buffer dimensions in pixels.
uniform float u_time;      // Track time in seconds.
uniform float u_bassRms;   // Smoothed linear RMS in the 40-150 Hz band.
uniform float u_rms;       // Smoothed linear full-band RMS.

out vec4 fragColor;

mat3 rotate3D(float angle, vec3 axis) {
    vec3 n = normalize(axis);
    float a = n.x;
    float b = n.y;
    float c = n.z;
    float co = cos(angle);
    float si = sin(angle);
    float k = 1.0 - co;

    // GLSL matrix constructors take columns. The caller uses vector * matrix.
    return mat3(
        vec3(co + a*a*k, b*a*k + c*si, c*a*k - b*si),
        vec3(a*b*k - c*si, co + b*b*k, c*b*k + a*si),
        vec3(a*c*k + b*si, b*c*k - a*si, co + c*c*k)
    );
}

vec3 hsv(float hue, float saturation, float value) {
    // Saturation intentionally remains unclamped, matching Fluorine.Math.hsv.
    vec3 channels = clamp(
        abs(fract(hue + vec3(0.0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0) - 1.0,
        0.0, 1.0
    );
    return value * (1.0 + saturation * (channels - 1.0));
}

vec3 fractalImage(vec2 coordinate, vec2 resolution, float time, float inversion) {
    vec2 uv = ((coordinate - resolution * 0.5) / resolution.y) * 5.0
            + vec2(0.0, 9.0);
    mat3 rotation = rotate3D(
        -1.1 - cos(time * 0.15) * 0.1,
        vec3(1.0, 11.0 + sin(time) * 0.15, -1.5)
    );

    float distance = 0.0;
    vec3 colour = vec3(0.0);

    for (int march = 0; march < 98; ++march) {
        vec3 p = vec3(uv, distance) * rotation;
        float scale = 2.0;
        float inversionFactor = 0.0;

        for (int fold = 0; fold < 19; ++fold) {
            inversionFactor = inversion / dot(p, p * 0.51);
            p = vec3(0.08, 4.0, -1.0)
              - abs(abs(p) * inversionFactor - vec3(3.0, 4.0, 3.0));
            scale *= inversionFactor;
        }

        distance += p.y / scale;
        float brightness = log2(scale) / exp(inversionFactor);
        colour += 0.01 - hsv(
            0.1, distance * 0.016 - inversionFactor * 0.3, brightness / 200.0
        );
    }

    return colour;
}

void main() {
    float bass = clamp(8.0 * u_bassRms, 0.0, 1.0);
    float loudness = clamp(3.0 * u_rms, 0.0, 1.0);
    vec3 rgb = clamp(
        fractalImage(gl_FragCoord.xy, u_resolution, u_time, 7.1 + 0.6 * bass),
        0.0, 1.0
    );
    vec3 contrasted = rgb * rgb;
    float brightness = 0.75 + 0.25 * loudness;
    fragColor = vec4(contrasted * brightness, 1.0);
}
