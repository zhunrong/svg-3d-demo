import { vec3, mat4 } from 'gl-matrix';
import { vec3ToRgb } from './utils';

export type Face = [number, number, number];

export abstract class Geometry {
  vertices: vec3[] = [];
  faces: Face[] = [];
  normals: vec3[] = [];
  colors: vec3[] = [];
  depth = 0;

  modelMatrix: mat4 = mat4.create();
  el = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  get normalMatrix() {
    const matrix = mat4.create();
    mat4.invert(matrix, this.modelMatrix);
    mat4.transpose(matrix, matrix);
    return matrix;
  }

  constructor(vertices: vec3[], faces: Face[], colors: vec3[]) {
    this.vertices = vertices;
    this.faces = faces;
    this.colors = colors;
    this.normals = faces.map(face => {
      const line1 = vec3.subtract(vec3.create(), this.vertices[face[1]], this.vertices[face[0]]);
      const line2 = vec3.subtract(vec3.create(), this.vertices[face[2]], this.vertices[face[1]]);
      const normal = vec3.create();
      vec3.cross(normal, line1, line2);
      vec3.normalize(normal, normal);
      return normal;
    });
    this.generatePath();
  }

  rotateX(rad: number) {
    mat4.rotateX(this.modelMatrix, this.modelMatrix, rad);
  }

  rotateY(rad: number) {
    mat4.rotateY(this.modelMatrix, this.modelMatrix, rad);
  }

  rotateZ(rad: number) {
    mat4.rotateZ(this.modelMatrix, this.modelMatrix, rad);
  }

  translate(x: number, y: number, z: number) {
    mat4.translate(
      this.modelMatrix,
      this.modelMatrix,
      vec3.fromValues(x, y, z)
    );
  }

  protected generatePath() {
    for (let i = 0; i < this.faces.length; i++) {
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      path.setAttribute('fill', vec3ToRgb(this.colors[i]));
      path.setAttribute('stroke', 'none');
      this.el.appendChild(path);
    }
  }
}

export default Geometry;
