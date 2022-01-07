<template>

  <div class="stack layout-radial-selector"
       v-bind:class="{'shift-out': lastHoverState}"
       v-bind:style="{'--translate-values': translationDirection}">
    <svg width="0" height="0">
      <defs>
        <clipPath :id="clipPathId" clipPathUnits="objectBoundingBox">
          <path :d="clipPathString" />
        </clipPath>
      </defs>
    </svg>

    <a class="sector"
       v-bind:style="{clipPath: `url(#${clipPathId})`,
                      backgroundColor: color,
                      '--radius': `${radius}px`}"
       :href="url"
       target="_blank"
       @click="clickSector()"
       @mouseover="hover(true)"
       @mouseout="hover(false)">
    </a>

    <div v-bind:style="{left: `${logoLocation.x}%`,
                        top: `${logoLocation.y}%`,
                        '--ratio-image': `${this.logoRatioHeight * 100}%`}"
         class="logo-container">
      <img :src="source"
           v-bind:style="{borderRadius: options.shape === 'circle' ? '50%' : '',
                          background: options.background}"
           class="logo-image" />
      <div class="text label center">{{ label }}</div>
    </div>

  </div>

</template>

<script lang="ts">
import { Common, Vector2 } from '../common';
import { deviceService, firebaseService } from '../services';

export default {
  name: 'RadialSector',

  props: {
    index: Number,
    sectorCount: Number,
    radius: Number,
    logoRatioHeight: Number,
    label: String,
    source: String,
    color: String,
    url: String,
    options: {
      type: Object,
      default: {},
    },
  },

  emits: {
    hover: {
      type: Boolean,
    },
  },

  data: () => ({
    ratioHole: .5,
    lastHoverState: false,
  }),

  computed: {
    clipPathId(): string {
      return `donut-curve-${this.index}`;
    },

    clipPathString(): string {
      let PI2 = 2 * Math.PI;
      let startAngle = this.index * PI2 / this.sectorCount
      let endAngle = startAngle + PI2 / this.sectorCount
      let deltaAngle = endAngle - startAngle;

      let startOuter = Vector2.fromDirection(startAngle).multiply(.5)
      let startInner = startOuter.clone().multiply(this.ratioHole)
      let endOuter = Vector2.fromDirection(endAngle).multiply(.5)
      let endInner = endOuter.clone().multiply(this.ratioHole)

      let gap = .005
      let calibrationVector = new Vector2(.5, .5)
      let calibrated = {
        so: startOuter.rotateByDistance(gap).addVector2(calibrationVector),
        si: startInner.rotateByDistance(gap).addVector2(calibrationVector),
        eo: endOuter.rotateByDistance(-gap).addVector2(calibrationVector),
        ei: endInner.rotateByDistance(-gap).addVector2(calibrationVector),
      }

      let radToDeg = 57.2958;
      let innerArc = this.ratioHole * .5;
      return `M${calibrated.eo.x},${calibrated.eo.y}
              A.5,.5,${deltaAngle * radToDeg},0,0,${calibrated.so.x},${calibrated.so.y}
              L${calibrated.si.x},${calibrated.si.y}
              A${innerArc},${innerArc},${deltaAngle * radToDeg},0,1,${calibrated.ei.x},${calibrated.ei.y}
              Z`
        .replaceAll(' ', '')
        .replaceAll('\n', '')
    },

    translationDirection(): string {
      let PI2 = 2 * Math.PI;
      let startAngle = this.index * PI2 / this.sectorCount
      let endAngle = startAngle + PI2 / this.sectorCount
      let directionVector = Vector2.fromDirection(Common.lerp(startAngle, endAngle))
        .multiply(2)
      return `${directionVector.x}%, ${directionVector.y}%`
    },

    logoLocation(): Vector2 {
      let PI2 = 2 * Math.PI;
      let startAngle = this.index * PI2 / this.sectorCount
      let endAngle = startAngle + PI2 / this.sectorCount
      let ratioLogoWidth = this.logoRatioHeight * 1.5
      let ratioLogoHeight = deviceService.isMobile ? this.logoRatioHeight * 1.9 : this.logoRatioHeight
      let middle = Vector2.fromDirection(Common.lerp(startAngle, endAngle))
        .multiply(.5) // scale to radius mode
        .multiply(.75) // location between inner & outer
        .add( // calibrate, and translate for half image size
          .5 - .5 * ratioLogoWidth,
          .5 - .5 * ratioLogoHeight)
        .multiply(100) // convert to %-units
      return middle
    },
  },

  methods: {
    clickSector() {
      firebaseService.log(`Click radial link ${this.label}`)
    },

    hover(isHover: boolean) {
      this.lastHoverState = isHover
      this.$emit('hover', isHover)
    },
  },

}

</script>

<style scoped lang="scss">

.layout-radial-selector {
  position: relative;
  pointer-events: none;

  --translate-values: 0, 0;
  transition: transform .2s ease-out .2s;

  &.shift-out {
    transform: translate(var(--translate-values));
  }
}

.sector {
  width: calc(var(--radius) * 2);
  aspect-ratio: 1;
  pointer-events: all;
  cursor: pointer;
  opacity: .2;
  transition: .2s ease-in-out;

  &:hover {
    opacity: .4;
  }

  &:active {
    opacity: .7;
  }
}

.logo-container {
  position: absolute;
  height: var(--ratio-image);
  aspect-ratio: 1.5;

  display: grid;
  justify-items: center;
  align-items: center;
  gap: .2em;
  grid-template-rows: 70% auto;

  border-radius: 50%;
  transition: .5s ease-in-out;

  .logo-image {
    height: 100%;
  }
}

</style>
