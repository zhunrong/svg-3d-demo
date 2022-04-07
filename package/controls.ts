import { vec3, quat, mat4 } from 'gl-matrix';
import { Camera } from './camera';
import { Scene } from './scene';

const UNIT_RAD = Math.PI / 180;

export class OrbitControls {
  isMouseDown = false;
  quat = quat.create();
  angleX = 0;
  angleY = 0;
  focusToPosition = vec3.create();
  focusToUp = vec3.create();

  // 相机轨道旋转主轴
  mainAxis = vec3.create();
  mainRotateMatrix = mat4.create();
  // 相机轨道旋转副轴
  crossAxis = vec3.create();
  crossRotateMatrix = mat4.create();
  rotateMatrix = mat4.create();

  constructor(private camera: Camera, private scene: Scene) {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    scene.view.addEventListener('mousedown', this.onMouseDown);
    quat.fromEuler(this.quat, 0, 0, 0);
  }

  updateMainAxis() {
    vec3.add(this.mainAxis, this.camera.focus, this.camera.up);
  }

  updateCrossAxis() {
    const axisRotateMatrix = mat4.create();
    mat4.fromRotation(axisRotateMatrix, -Math.PI / 2, this.focusToPosition);
    vec3.transformMat4(this.crossAxis, this.mainAxis, axisRotateMatrix);
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.scene.view.removeEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown = () => {
    this.isMouseDown = true;
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isMouseDown) return;
    vec3.subtract(this.focusToPosition, this.camera.position, this.camera.focus);
    vec3.add(this.focusToUp, this.focusToPosition, this.camera.up);
    this.updateMainAxis();
    this.updateCrossAxis();
    mat4.fromRotation(this.crossRotateMatrix, -UNIT_RAD * e.movementY * 0.5, this.crossAxis);
    mat4.fromRotation(this.mainRotateMatrix, -UNIT_RAD * e.movementX * 0.5, this.mainAxis);
    mat4.multiply(this.rotateMatrix, this.crossRotateMatrix, this.mainRotateMatrix);
    vec3.transformMat4(this.focusToPosition, this.focusToPosition, this.rotateMatrix);
    vec3.transformMat4(this.focusToUp, this.focusToUp, this.rotateMatrix);
    vec3.add(this.camera.position, this.camera.focus, this.focusToPosition);
    vec3.subtract(this.camera.up, this.focusToUp, this.focusToPosition);
  };

  private onMouseUp = () => {
    this.isMouseDown = false;
  };
}
