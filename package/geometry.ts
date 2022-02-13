import { vec3, mat4 } from 'gl-matrix';

export type Face = [number, number, number];

export abstract class Geometry {
  vertices: vec3[] = [];
  faces: Face[] = [];
  colors: string[] = [];
  depth = 0;

  modelMatrix: mat4 = mat4.create();
  el = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  constructor(vertices: vec3[], faces: Face[], colors: string[]) {
    this.vertices = vertices;
    this.faces = faces;
    this.colors = colors;
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
      path.setAttribute('fill', this.colors[i]);
      path.setAttribute('stroke', 'none');
      this.el.appendChild(path);
    }
  }
}

export default Geometry;
