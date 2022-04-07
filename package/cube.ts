import Geometry, { Face } from './geometry';
import { vec3 } from 'gl-matrix';

export class Cube extends Geometry {
  constructor(size: number) {
    const half = size / 2;
    const vertices: vec3[] = [
      vec3.fromValues(-half, half, half),
      vec3.fromValues(half, half, half),
      vec3.fromValues(-half, -half, half),
      vec3.fromValues(half, -half, half),
      vec3.fromValues(-half, half, -half),
      vec3.fromValues(half, half, -half),
      vec3.fromValues(-half, -half, -half),
      vec3.fromValues(half, -half, -half),
    ];
    const faces: Face[] = [
      // 正面
      [0, 2, 1],
      [1, 2, 3],
      // 背面
      [5, 7, 4],
      [4, 7, 6],
      // 上面
      [4, 0, 5],
      [5, 0, 1],
      // 下面
      [2, 6, 3],
      [3, 6, 7],
      // 右面
      [1, 3, 5],
      [5, 3, 7],
      // 左面
      [4, 6, 0],
      [0, 6, 2],
    ];
    const colors: vec3[] = [
      vec3.fromValues(255, 0, 0),
      vec3.fromValues(255, 0, 0),
      vec3.fromValues(0, 255, 0),
      vec3.fromValues(0, 255, 0),
      vec3.fromValues(0, 0, 255),
      vec3.fromValues(0, 0, 255),
      vec3.fromValues(255, 255, 0),
      vec3.fromValues(255, 255, 0),
      vec3.fromValues(0, 255, 255),
      vec3.fromValues(0, 255, 255),
      vec3.fromValues(255, 0, 255),
      vec3.fromValues(255, 0, 255),
    ];
    super(vertices, faces, colors);
  }
}

export default Cube;
