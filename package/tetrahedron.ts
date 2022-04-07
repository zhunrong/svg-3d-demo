import { Geometry, Face } from './geometry';
import { vec3 } from 'gl-matrix';

export class Tetrahedron extends Geometry {
  constructor(size: number) {
    const half = size / 2;
    const z1 = half * Math.tan(Math.PI / 6);
    const vertices: vec3[] = [
      vec3.fromValues(-half, 0, z1),
      vec3.fromValues(half, 0, z1),
      vec3.fromValues(0, 0, z1 - size * Math.cos(Math.PI / 6)),
      vec3.fromValues(
        0,
        Math.sqrt(size ** 2 - (half / Math.cos(Math.PI / 6)) ** 2),
        0
      ),
    ];
    const faces: Face[] = [
      [0, 1, 3],
      [1, 2, 3],
      [2, 0, 3],
      [1, 0, 2],
    ];
    const colors: vec3[] = [
      vec3.fromValues(255, 0, 0),
      vec3.fromValues(0, 255, 0),
      vec3.fromValues(0, 0, 255),
      vec3.fromValues(255, 255, 0),
    ];
    super(vertices, faces, colors);
  }
}
