<template>
  <div class="stack layout-radial-container" ref="radialContainer">

    <RadialSector v-for="(sector, i) of config.sectors"
                  :key="sector.label"
                  :index="i"
                  :sector-count="config.sectors.length"
                  :radius="radius"
                  :label="sector.label"
                  :source="sector.source"
                  :color="sector.color"
                  :url="sector.url"
                  :options="sector.options"
    />

    <div>
      <div class="text subtitle">Blaarkies Hub</div>
      <img class="main-image"
           :src="config.sourceMain"
           v-bind:style="{
               transform: `rotate3d(${pointerRelativeLocation.x}, ${pointerRelativeLocation.y}, 0, 46deg)`
           }"/>
      <div class="text label center">Where would you like to go?</div>
    </div>

  </div>
</template>

<script lang="ts">
import RadialSector from './RadialSector.vue';
import { Vector2 } from '../common/vector2';

let resizeHandler;
let pointerMoveHandler;

export default {
  name: 'RadialContainer',
  components: {RadialSector},

  props: {
    config: Object,
  },

  data: () => ({
    radius: 400,
    pointerRelativeLocation: new Vector2(),
  }),

  mounted() {
    resizeHandler = event => {
      this.radius = Math.min(this.$refs.radialContainer.clientWidth, this.$refs.radialContainer.clientHeight) * .5
    }
    window.addEventListener('resize', resizeHandler)
    resizeHandler()

    pointerMoveHandler = (event: PointerEvent) => {
    }
    window.addEventListener('pointermove', pointerMoveHandler)
    pointerMoveHandler()
  },

  unmounted() {
    window.removeEventListener('resize', resizeHandler)
    window.removeEventListener('pointermove', pointerMoveHandler)
  }
}
</script>

<style scoped lang="scss">

.layout-radial-container {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;

  place-self: center;
  place-items: center;

  perspective: 75vh;
  perspective-origin: center;
  transform-style: preserve-3d;
}

.main-image {
  border-radius: 50%;
  height: 16%;
}

</style>
