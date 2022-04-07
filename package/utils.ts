import { vec3 } from 'gl-matrix';

export const vec3ToRgb = (v3: vec3) => {
  return `rgb(${v3[0]},${v3[1]},${v3[2]})`;
};
