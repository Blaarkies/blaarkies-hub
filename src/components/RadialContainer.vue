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
                transform: `rotate3d(${tiltDirection.x}, ${tiltDirection.y}, 0, ${tiltAngle}deg)`
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
                    @hover="updateActiveSector(i+1, $event)"
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

  methods: {
    updateActiveSector(index: number, isHover: boolean) {
      if (!isHover) {
        this.tiltAngle = 0
        return
      }
      let maxIndex = this.config.sectors.length
      this.tiltAngle = 20
      this.tiltDirection = Vector2.fromDirection(Math.PI * 2 * index / maxIndex + Math.PI * .5 - Math.PI / maxIndex)
    },
  },

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
  },

  unmounted() {
    window?.removeEventListener('resize', resizeHandler)
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

      img {
        transition: .5s ease-in-out;
      }
    }
  }
}

</style>
