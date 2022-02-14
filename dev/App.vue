<template>
  <div id="app" />
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Scene,
  SVGRenderer,
  Cube,
  OrbitControls,
  PerspectiveCamera,
  Tetrahedron
} from '@package';

export default Vue.extend({
  mounted() {
    const scene = new Scene(800, 800);
    scene.mount(this.$el as HTMLDivElement);
    const camera = new PerspectiveCamera();
    camera.setPosition(0, 0, 500);
    camera.setUp(0, 1, 0);

    new OrbitControls(camera, scene);

    const cube1 = new Cube(100);
    scene.addChild(cube1);

    const tetrahedron = new Tetrahedron(50);
    tetrahedron.translate(-150, 0, 0);
    scene.addChild(tetrahedron);

    const cube2 = new Cube(50);
    cube2.translate(100, 100, 0);
    scene.addChild(cube2);

    const renderer = new SVGRenderer();

    const renderLoop = () => {
      renderer.render(scene, camera);
      cube2.rotateX(Math.PI / 360);
      cube2.rotateY(Math.PI / 360);
      tetrahedron.rotateY(Math.PI / 360);
      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  },
});
</script>

