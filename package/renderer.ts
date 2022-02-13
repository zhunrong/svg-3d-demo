import Scene from './scene';
import { Camera } from './camera';
import { mat4, vec4, vec3 } from 'gl-matrix';

export class SVGRenderer {

  depthTest = true;

  render(scene: Scene, camera: Camera) {
    const line1 = vec3.create();
    const line2 = vec3.create();
    const normal = vec3.create();
    const minSize = Math.min(scene.width, scene.height) * 0.5;

    const viewProjectMatrix = mat4.create();
    mat4.multiply(viewProjectMatrix, camera.projectMatrix, camera.viewMatrix);
    scene.children.forEach((child) => {
      child.depth = Number.MIN_SAFE_INTEGER;
      const matrix = mat4.create();
      mat4.multiply(matrix, viewProjectMatrix, child.modelMatrix);

      child.faces.forEach((face, faceIndex) => {
        const coords = face.map((vertexIndex) => {
          const vertex = child.vertices[vertexIndex];
          const v4 = vec4.fromValues(vertex[0], vertex[1], vertex[2], 1);
          vec4.transformMat4(v4, v4, matrix);
          child.depth = Math.max(child.depth, v4[2]);
          return vec3.fromValues(v4[0] / v4[3], v4[1] / v4[3], 1);
        });
        const path = coords
          .map((coord, index) => {
            return `${index === 0 ? 'M' : 'L'}${coord[0] * minSize},${-coord[1] * minSize}`;
          })
          .join(' ');
        const pathElement = child.el.children[faceIndex];
        pathElement.setAttribute('d', path);

        vec3.subtract(line1, coords[1], coords[0]);
        vec3.subtract(line2, coords[2], coords[1]);
        vec3.cross(normal, line1, line2);

        pathElement.setAttribute(
          'fill',
          normal[2] > 0 ? child.colors[faceIndex] : 'none'
        );
      });
    });

    if (this.depthTest) {
      scene.children.sort((a,b) => b.depth - a.depth);
      for (let i = scene.children.length - 2;i >= 0;i--) {
        const current = scene.children[i];
        const after = scene.children[i + 1];
        if (current.el.nextElementSibling !== after.el) {
          scene.root.insertBefore(current.el, after.el);
        }
      }
    }
  }
}

export default SVGRenderer;
