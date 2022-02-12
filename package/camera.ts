import {mat4} from 'gl-matrix';

export abstract class Camera {
  projectMatrix = mat4.create();
}

export class OrthographicCamera extends Camera {
  projectMatrix = mat4.create();

  constructor() {
    super();
    mat4.ortho(this.projectMatrix, -300, 300, -300, 300, 0.1, 500);
  }
}

export class PerspectiveCamera extends Camera {
  constructor() {
    super();
  }
}
