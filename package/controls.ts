import { vec2, vec3 } from 'gl-matrix';
import { Camera } from './camera';
import { Scene } from './scene';

export class OrbitControls {
  isMouseDown = false;
  mouseStart = vec2.create();
  mouseCurrent = vec2.create();

  constructor(private camera: Camera, private scene: Scene) {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    scene.view.addEventListener('mousedown', this.onMouseDown);
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.scene.view.removeEventListener('mousedown', this.onMouseDown);
  }

  private onMouseDown = (e: MouseEvent) => {
    this.isMouseDown = true;
    vec2.set(this.mouseStart, e.pageX, e.pageY);
  };

  private onMouseMove = (e: MouseEvent) => {
    if (!this.isMouseDown) return;
    vec3.rotateX(
      this.camera.position,
      this.camera.position,
      vec3.create(),
      (-(0.5 * Math.PI) / 360) * e.movementY
    );
    vec3.rotateY(
      this.camera.position,
      this.camera.position,
      vec3.create(),
      (-(0.5 * Math.PI) / 360) * e.movementX
    );
  };

  private onMouseUp = () => {
    this.isMouseDown = false;
  };
}
