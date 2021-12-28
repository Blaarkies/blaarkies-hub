<template>
  <div class="layout-radial-container-wrapper" ref="radialContainerWrapper">

    <div class="stack layout-radial-container-content">

      <div class="layout-logo"
           v-bind:style="{width: `${radius * .7}px`}"
           ref="blaarkiesLogo">

        <CubeLogo />
        <img class="main-image"
             :src="config.sourceMain"
             alt="A blaarkies cube"
             v-bind:style="{
                maxHeight: `${radius * .5}px`,
                transform: `rotate3d(${tiltDirection.y}, ${-tiltDirection.x}, 0, ${tiltAngle}deg)`
             }"
        />
        <div class="text label center">Where would you like to go?</div>
      </div>

      <RadialSector v-for="(sector, i) of config.sectors"
                    :key="sector.label"
                    :index="i"
                    :sector-count="config.sectors.length"
                    :radius="radius"
                    :logo-ratio-height="isMobile ? .1 : .15"
                    :label="sector.label"
                    :source="sector.source"
                    :color="sector.color"
                    :url="sector.url"
                    :options="sector.options"
      />

    </div>
  </div>
</template>

<script lang="ts">
import RadialSector from './RadialSector.vue';
import { Common, Vector2 } from '../common';
import CubeLogo from './CubeLogo.vue';
import { deviceService } from '../services';

let resizeHandler
let pointerMoveHandler
let deviceCallbackKey

export default {
  name: 'RadialContainer',
  components: {CubeLogo, RadialSector},

  props: {
    config: Object,
  },

  data: () => ({
    radius: 400,
    tiltDirection: new Vector2(),
    tiltAngle: 0,
    debugVector: new Vector2(0, 0),
    isMobile: deviceService.getDevice().type === 'mobile',
  }),

  mounted() {
    deviceCallbackKey = deviceService.onDeviceChangeEvent(device => this.isMobile = device.type === 'mobile')

    resizeHandler = event => {
      let isMobile = this.isMobile
      if (isMobile) {
        this.radius = 183
      } else {
        let shortDimension = Math.min(window.innerWidth, window.innerHeight)
        this.radius = Common.coerceAtLeast(shortDimension, 600) * .5 - 80
      }
    }
    window.addEventListener('resize', resizeHandler)
    resizeHandler()

    pointerMoveHandler = (event: PointerEvent) => {
      let logo = this.$refs.blaarkiesLogo
      if (!logo) {
        return
      }
      let radialContainer = logo.parentElement;
      let center = new Vector2(radialContainer.offsetLeft, logo.offsetTop).addVector2(
        new Vector2(radialContainer.offsetWidth, logo.offsetHeight).multiply(.5))

      let cursor = new Vector2(event.x, event.offsetY);
      this.debugVector = cursor.clone()

      let difference = center.subtractVector2(cursor)
      this.tiltAngle = Common.coerceAtMost(18 * difference.length / this.radius, 20)
      this.tiltDirection = difference.clone()
    }
    this.$refs.radialContainerWrapper.addEventListener('pointermove', pointerMoveHandler)
  },

  unmounted() {
    window?.removeEventListener('resize', resizeHandler)
    this.$refs.radialContainerWrapper?.removeEventListener('pointermove', pointerMoveHandler)
    deviceService.clearDeviceChangeEvent(deviceCallbackKey)
  }
}
</script>

<style scoped lang="scss">

.layout-radial-container-wrapper {
  position: relative;

  display: grid;
  padding: 40px;

  .layout-radial-container-content {
    justify-self: center;

    .layout-logo {
      place-self: center;

      display: flex;
      gap: .5em;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      perspective: 50vh;
      perspective-origin: center;
      transform-style: preserve-3d;

      .main-image {
        border-radius: 40%;
        aspect-ratio: 1;
      }
    }
  }
}

</style>
