import Geometry from './geometry';

export class Scene {
  view = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  root = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  children: Geometry[] = [];

  constructor(public width = 400, public height = 400) {
    this.view.setAttribute('width', String(width));
    this.view.setAttribute('height', String(height));
    this.view.setAttribute('viewBox', `0 0 ${width} ${height}`);
    this.view.style.border = '1px dashed #ccc';
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    this.view.innerHTML = `
      <defs>
        <marker id="triangle" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff0000" />
        </marker>
      </defs>
      <g transform="translate(0.5,0.5)">
        <line x1="0" y1="${halfHeight}" x2="${width}" y2="${halfHeight}" stroke-width="1" stroke="#ff0000" stroke-dasharray="6,10" marker-end="url(#triangle)"></line>
        <line x1="${halfWidth}" y1="${height}" x2="${halfWidth}" y2="0" stroke-width="1" stroke="#ff0000" stroke-dasharray="6,10" marker-end="url(#triangle)"></line>
      </g>
    `;
    this.root.setAttribute(
      'transform',
      `translate(${halfWidth + 0.5},${halfHeight + 0.5})`
    );
    this.view.appendChild(this.root);
  }

  addChild(child: Geometry) {
    if (this.children.includes(child)) return;
    this.children.push(child);
    this.root.appendChild(child.el);
  }

  mount(container: HTMLElement) {
    container.appendChild(this.view);
  }
}

export default Scene;
