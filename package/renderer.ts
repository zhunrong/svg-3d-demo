import Scene from './scene';
import { Camera } from './camera';
import { mat4, vec4, vec3 } from 'gl-matrix';
import { vec3ToRgb } from './utils';

export class SVGRenderer {

  depthTest = true;

  /**
   * 环境光
   */
  ambientLight = {
    color: vec3.fromValues(255, 255, 255),
    intensity: 0.1
  };

  /**
   * 方向光
   */
  directionalLight = {
    direction: vec3.fromValues(0.5, 1, 0.5),
    color: vec3.fromValues(255, 255, 255),
    intensity: 0.9
  };

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
      const normalMatrix = child.normalMatrix;

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

        const originNormal = child.normals[faceIndex];
        const faceNormalV4 = vec4.fromValues(originNormal[0], originNormal[1], originNormal[2], 1);
        vec4.transformMat4(faceNormalV4, faceNormalV4, normalMatrix);
        const faceNormalV3 = vec3.fromValues(faceNormalV4[0], faceNormalV4[1], faceNormalV4[2]);

        const fillColor = normal[2] > 0 ? this.calcColor(child.colors[faceIndex], faceNormalV3) : 'none';
        pathElement.setAttribute('fill', fillColor);
      });
    });

    if (this.depthTest) {
      scene.children.sort((a, b) => b.depth - a.depth);
      for (let i = scene.children.length - 2; i >= 0; i--) {
        const current = scene.children[i];
        const after = scene.children[i + 1];
        if (current.el.nextElementSibling !== after.el) {
          scene.root.insertBefore(current.el, after.el);
        }
      }
    }
  }

  calcColor(originColor: vec3, faceNormal: vec3) {
    const ambientLightColor = vec3.create();
    // 计算环境光效果
    vec3.scale(ambientLightColor, this.ambientLight.color, this.ambientLight.intensity);
    vec3.multiply(ambientLightColor, ambientLightColor, originColor);
    // 计算方向光效果
    const directionalLightColor = vec3.create();
    vec3.multiply(directionalLightColor, this.directionalLight.color, originColor);
    vec3.scale(directionalLightColor, directionalLightColor, Math.max(vec3.dot(this.directionalLight.direction, faceNormal) * this.directionalLight.intensity, 0));
    // 叠加
    const color = vec3.create();
    vec3.add(color, ambientLightColor, directionalLightColor);

    vec3.divide(color, color, vec3.fromValues(255, 255, 255));
    return vec3ToRgb(color);
  }
}

export default SVGRenderer;
