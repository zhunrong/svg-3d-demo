import Scene from './scene';
import { Camera } from './camera';
import { mat4, vec4, vec3 } from 'gl-matrix';

export class SVGRenderer {
  size = [1,1];
  setSize(width: number, height: number) {
    this.size[0] = width / 2;
    this.size[1] = height / 2;
  }
  render(scene: Scene, camera: Camera) {
    const line1 = vec3.create();
    const line2 = vec3.create();
    const normal = vec3.create();
    scene.children.forEach((child) => {
      const matrix = mat4.create();
      mat4.multiply(matrix, camera.projectMatrix, child.modelMatrix);

      child.faces.forEach((face, faceIndex) => {
        const coords = face.map((vertexIndex) => {
          const vertex = child.vertices[vertexIndex];
          const v4 = vec4.fromValues(vertex[0], vertex[1], vertex[2], 1);
          vec4.transformMat4(v4, v4, matrix);
          return vec3.fromValues(v4[0] / v4[3], v4[1] / v4[3], 1);
        });
        const path = coords
          .map((coord, index) => {
            return `${index === 0 ? 'M' : 'L'}${coord[0] * this.size[0]},${coord[1] * this.size[1]}`;
          })
          .join(' ');
        const pathElement = child.el.children[faceIndex];
        pathElement.setAttribute('d', path);

        vec3.subtract(line1, coords[1], coords[0]);
        vec3.subtract(line2, coords[2], coords[1]);
        vec3.cross(normal, line1, line2);

        pathElement.setAttribute('fill', normal[2] < 0 ? child.colors[faceIndex] : 'none');
      });
    });
  }
}

export default SVGRenderer;