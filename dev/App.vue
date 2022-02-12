<template>
  <div id="app" />
</template>

<script lang="ts">
import Vue from 'vue';
import { Scene, SVGRenderer, Cube, OrthographicCamera } from '@package';
export default Vue.extend({
  mounted() {
    const scene = new Scene(600, 600);
    scene.mount(this.$el as HTMLDivElement);

    const camera = new OrthographicCamera();

    const cube = new Cube(100);
    scene.addChild(cube);

    const renderer = new SVGRenderer();
    renderer.setSize(600, 600);

    const renderLoop = () => {
      renderer.render(scene, camera);
      cube.rotateX(Math.PI / 360);
      cube.rotateY(Math.PI / 360);
      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  },
});
</script>

<style lang="scss" scoped>
#app {
  width: 600px;
  height: 600px;
}
</style>

