/**
 * "Systems Core" — a single-pass volumetric + raymarched scene for the hero.
 *
 * Fullscreen triangle, no attributes, no buffers, no scene graph. One fragment
 * shader pass, which is why this replaces the previous three.js mesh scene at
 * roughly 1/30th of the transfer cost.
 *
 * The gyroid web is rendered *volumetrically* rather than sphere-traced. A
 * gyroid lattice's zero set has no exact distance field, so marching it as a
 * surface tunnels through the struts and the whole thing collapses into a dimpled
 * ball. Integrating emissive density through the field instead gives a crisp
 * glowing web, needs no normals, and is cheaper because the march is a fixed
 * step count starting at an analytic bounding-sphere entry.
 *
 * Only the low-frequency solids (core sphere, orbital rings) are sphere-traced.
 */

export const VERT = /* glsl */ `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

export const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uPointer;
uniform float uScroll;

/* Palette arrives as uniforms from the CSS tokens rather than being baked in
   here, so a theme switch repaints the nebula instead of leaving it on the
   previous theme's colours. */
uniform vec3  uInk;     /* page ground */
uniform vec3  uAccent;  /* primary azure */
uniform vec3  uGlow;    /* secondary teal */
uniform vec3  uSignal;  /* warm counterpoint */
uniform float uTheme;   /* 0 = dark, 1 = light */

out vec4 fragColor;

const int   SOLID_STEPS = 48;
const int   VOL_STEPS  = 48;
const float SOLID_DIST = 12.0;
const float SURF_DIST  = 0.0016;
const float CORE_R     = 1.42;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float sdTorus(vec3 p, vec2 t) {
  return length(vec2(length(p.xz) - t.x, p.y)) - t.y;
}

/* Shared tumble so the volume and the solids stay locked together. */
vec3 spin(vec3 p) {
  p.xz = rot(uTime * 0.13 + uScroll * 1.1) * p.xz;
  p.xy = rot(uTime * 0.085) * p.xy;
  return p;
}

/* ---- Volumetric gyroid web ------------------------------------------- */

float gyroid(vec3 p) {
  p *= 6.0;
  return dot(sin(p), cos(p.yzx)) * 0.32;
}

float latticeDensity(vec3 wp) {
  vec3 q = spin(wp);
  float r = length(q);

  /* Bounding shell for the whole field. Most samples along a ray land outside
     it, so this keeps the expensive gyroid off the common path. */
  if (r > 1.60) return 0.0;

  /* Soft emissive nucleus at the centre, so the solid core reads as a glowing
     body rather than a hard disc sitting on top of the web. */
  float nucleus = exp(-r * 4.6) * 0.85;

  /* Confine the web to a spherical shell so it reads as a lattice sphere. */
  float band = 1.0 - smoothstep(0.0, 0.30, abs(r - 0.96));

  /* Inside or outside the shell there is no lattice to evaluate. */
  if (band <= 0.0) return nucleus;

  float g = abs(gyroid(q + vec3(0.0, uTime * 0.16, 0.0)));

  /* Thin bright sheet at the zero set, soft falloff either side. */
  float web = exp(-g * 19.0);

  /* Let the core light bleed into the web near the middle. */
  float pulse = 0.75 + 0.25 * sin(uTime * 0.8 + r * 3.0);

  return web * band * pulse + nucleus;
}

float sphereEntry(vec3 ro, vec3 rd, float r) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - r * r;
  float h = b * b - c;
  if (h < 0.0) return -1.0;
  return -b - sqrt(h);
}

/* Front-to-back accumulation. .a is coverage, used to attenuate what is behind. */
vec4 volumeMarch(vec3 ro, vec3 rd, float tStart, float tEnd) {
  vec4 acc = vec4(0.0);
  if (tStart < 0.0 || tEnd <= tStart) return acc;

  float dt = (tEnd - tStart) / float(VOL_STEPS);
  float jitter = hash21(gl_FragCoord.xy) * dt * 0.85;
  float t = tStart + jitter;

  for (int i = 0; i < VOL_STEPS; i++) {
    vec3 p = ro + rd * t;
    float d = latticeDensity(p);

    if (d > 0.004) {
      /* Tri-tone ramp across the shell: azure at the rim, teal through the
         mid, and a warm signal highlight where the web faces the key light.
         A two-tone ramp left the far side of the sphere reading as one flat
         colour; the third stop is what gives the volume a light direction. */
      float depth = 1.0 - smoothstep(0.3, 1.35, length(p));
      float warmth = smoothstep(-0.2, 0.9, p.y * 0.7 + p.x * 0.3);

      vec3 c = mix(uAccent, uGlow, depth);
      c = mix(c, uSignal, warmth * 0.30);
      c = mix(c, mix(uGlow, vec3(1.0), 0.55), depth * depth * 0.30);

      float a = 1.0 - exp(-d * mix(3.4, 1.15, uTheme) * dt);
      acc.rgb += (1.0 - acc.a) * c * a;
      acc.a += (1.0 - acc.a) * a;

      if (acc.a > mix(0.985, 0.80, uTheme)) break;
    }
    t += dt;
  }
  return acc;
}

/* ---- Solid geometry -------------------------------------------------- */

float mapSolid(vec3 p) {
  vec3 q = spin(p);

  float heart = length(q) - 0.17;

  vec3 r1 = q;
  r1.xy = rot(0.62) * r1.xy;
  r1.yz = rot(0.38) * r1.yz;
  float ring1 = sdTorus(r1, vec2(1.40, 0.018));

  vec3 r2 = q;
  r2.yz = rot(1.15) * r2.yz;
  r2.xz = rot(-0.48) * r2.xz;
  float ring2 = sdTorus(r2, vec2(1.66, 0.013));

  return min(heart, min(ring1, ring2));
}

vec3 calcNormal(vec3 p) {
  const float e = 0.0018;
  const vec2 k = vec2(1.0, -1.0);
  return normalize(vec3(
    mapSolid(p + k.xyy * e) - mapSolid(p - k.xyy * e),
    mapSolid(p + k.yyx * e) - mapSolid(p - k.yyx * e),
    mapSolid(p + k.yxy * e) - mapSolid(p - k.yxy * e)
  ));
}

float rayMarchSolid(vec3 ro, vec3 rd, float tMax) {
  float t = 0.0;
  for (int i = 0; i < SOLID_STEPS; i++) {
    float d = mapSolid(ro + rd * t);
    if (d < SURF_DIST * (1.0 + t * 0.5)) return t;
    t += max(d * 0.9, 0.008);
    if (t > tMax) break;
  }
  return -1.0;
}

vec3 shadeSolid(vec3 p, vec3 rd) {
  vec3 n = calcNormal(p);
  vec3 v = -rd;

  float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 3.0);

  vec3 lig = normalize(vec3(0.55, 0.75, 0.45));
  float dif = clamp(dot(n, lig), 0.0, 1.0);
  vec3 hal = normalize(lig + v);
  float spe = pow(clamp(dot(n, hal), 0.0, 1.0), 72.0);

  /* Banded shell shading so the core reads as a lit sphere, not a flat disc. */
  float curve = 0.35 + 0.65 * clamp(dot(n, normalize(vec3(-0.4, 0.6, 0.7))), 0.0, 1.0);
  vec3 col = vec3(0.10, 0.26, 0.52) * (0.10 + 0.95 * dif * curve);
  col += spe * vec3(0.80, 0.93, 1.00) * 1.10;
  col += fres * uGlow * 0.85;
  col += uGlow * 0.10 * pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 1.5);
  return col;
}

mat3 setCamera(vec3 ro, vec3 ta, float cr) {
  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(sin(cr), cos(cr), 0.0);
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = cross(cu, cw);
  return mat3(cu, cv, cw);
}

vec3 sky(vec3 rd) {
  float g = smoothstep(-0.65, 0.95, rd.y);

  /* Dark: near-black ground lifting to a deep blue at the horizon.
     Light: a paper-white ground with a faint cool cast. The nebula has to sit
     *on* the page in light mode, not glow through it, so the whole ramp
     inverts and the contrast drops. */
  vec3 lowDark  = uInk;
  vec3 highDark = mix(uInk, uAccent, 0.16);
  vec3 lowLight = mix(uInk, vec3(1.0), 0.06);
  vec3 highLight = vec3(1.0);

  vec3 c = mix(mix(lowLight, highLight, g), mix(lowDark, highDark, g), 1.0 - uTheme);
  c += uAccent * mix(0.030, 0.055, uTheme) * pow(1.0 - abs(rd.y), 8.0);
  return c;
}

float stars(vec3 rd) {
  /* Stars belong to the night. In light mode they would read as dust. */
  if (uTheme > 0.5) return 0.0;
  vec2 uv = vec2(atan(rd.z, rd.x) * 0.1591, rd.y * 0.5 + 0.5) * 260.0;
  float h = hash21(floor(uv));
  if (h < 0.9905) return 0.0;
  float tw = 0.55 + 0.45 * sin(uTime * 1.4 + h * 60.0);
  return tw * smoothstep(0.30, 0.02, length(fract(uv) - 0.5));
}

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - uRes) / uRes.y;
  uv.x -= 0.12;

  float orbit = uTime * 0.095 + uPointer.x * 0.55;
  float dist  = 4.55 - uPointer.y * 0.45;
  vec3 ta = vec3(0.0, -uScroll * 0.9, 0.0);
  vec3 ro = ta + vec3(cos(orbit) * dist, 0.50 + uPointer.y * 0.55, sin(orbit) * dist);

  mat3 ca = setCamera(ro, ta, 0.0);
  vec3 rd = ca * normalize(vec3(uv, 2.35));

  vec3 bg = sky(rd) + vec3(0.55, 0.70, 0.95) * stars(rd) * 0.6;

  /* Solids first so the volume can stop at the front-most opaque surface. */
  float tSolid = rayMarchSolid(ro, rd, SOLID_DIST);

  float tEnter = sphereEntry(ro, rd, CORE_R);
  float tExit = tEnter + 2.0 * CORE_R;
  float tEnd = (tSolid > 0.0) ? min(tSolid, tExit) : tExit;

  /* Front-to-back along the ray: whatever is behind the volume is attenuated
     by its coverage. The rings orbit outside the volume, so they can be the
     front-most hit with zero volume in front of them. */
  vec3 behind = bg;
  if (tSolid > 0.0) behind = shadeSolid(ro + rd * tSolid, rd);

  vec4 vol = volumeMarch(ro, rd, tEnter, tEnd);
  vec3 col = behind * (1.0 - vol.a) + vol.rgb;

  /* Reinhard rolloff, then gamma — but only part-strength in light mode. That
     curve exists to tame a bright HDR-ish dark render; applied to an already
     display-referred light palette it just muddies everything toward grey. */
  float rolloff = mix(1.0, 0.28, uTheme);
  vec3 mapped = col / (1.0 + col);
  col = mix(col, mapped, rolloff);
  col = pow(max(col, 0.0), vec3(mix(0.4545, 0.92, uTheme)));

  /* Vignette stays, but lighter grounds need a softer edge or the corners
     read as grey smudges rather than shading. */
  vec2 q = gl_FragCoord.xy / uRes;
  float vig = pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.22);
  col *= mix(0.58 + 0.42 * vig, 0.82 + 0.18 * vig, uTheme);

  /* Dither kills the banding that dark gradients always show. */
  col += (hash21(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.0055;

  fragColor = vec4(col, 1.0);
}
`;
