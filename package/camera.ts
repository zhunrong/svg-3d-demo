import { mat4, vec3 } from 'gl-matrix';

export abstract class Camera {
  _viewMatrix = mat4.create();
  projectMatrix = mat4.create();
  position = vec3.create();
  focus = vec3.create();
  up = vec3.fromValues(0, 1, 0);

  get viewMatrix() {
    return mat4.lookAt(this._viewMatrix, this.position, this.focus, this.up);
  }

  setPosition(x: number, y: number, z: number) {
    vec3.set(this.position, x, y, z);
  }

  setFocus(x: number, y: number, z: number) {
    vec3.set(this.focus, x, y, z);
  }

  setUp(x: number, y: number, z: number) {
    vec3.set(this.up, x, y, z);
  }
}

export class OrthographicCamera extends Camera {
  constructor() {
    super();
    mat4.ortho(this.projectMatrix, -300, 300, -300, 300, 0.1, 500);
  }
}

export class PerspectiveCamera extends Camera {
  constructor() {
    super();
    mat4.perspective(this.projectMatrix, Math.PI / 180 * 50, 1, 0.1, 1000);
  }
}
