<template>

  <div class="stack">
    <svg width="0" height="0">
      <defs>
        <clipPath :id="clipPathId" clipPathUnits="objectBoundingBox">
          <path :d="clipPathString" />
        </clipPath>
      </defs>
    </svg>

    <a :href="url" target="_blank" :ref="label" class="hidden"></a>

    <div class="sector"
         v-bind:style="{clipPath: `url(#${clipPathId})`,
                        backgroundColor: color,
                        '--radius': `${radius}px`}"
         @click="$refs[label].click()">
    </div>

    <div v-bind:style="{left: `${logoLocation.x}%`,
                        top: `${logoLocation.y}%`,
                        '--ratio-image': `${this.ratioImage * 100}%`}"
         class="logo-container">
      <img :src="source"
           v-bind:style="{borderRadius: options.shape === 'circle' ? '50%' : '',
                          background: options.background}"
           class="logo-image" />
      <div class="text label">{{ label }}</div>
    </div>

  </div>

</template>

<script lang="ts">
import { Vector2 } from '../common/vector2';

export default {
  name: 'RadialSector',

  props: {
    index: Number,
    sectorCount: Number,
    radius: Number,
    label: String,
    source: String,
    color: String,
    url: String,
    options: {
      type: Object,
      default: {},
    },
  },

  data: () => ({
    ratioHole: .5,
    ratioImage: .18,
  }),

  computed: {
    clipPathId() {
      return `donut-curve-${this.index}`;
    },

    clipPathString() {
      let PI2 = 2 * Math.PI;
      let startAngle = this.index * PI2 / this.sectorCount
      let endAngle = startAngle + PI2 / this.sectorCount
      let deltaAngle = endAngle - startAngle;

      let startOuter = Vector2.fromDirection(startAngle).multiply(.5)
      let startInner = startOuter.clone().multiply(this.ratioHole)
      let endOuter = Vector2.fromDirection(endAngle).multiply(.5)
      let endInner = endOuter.clone().multiply(this.ratioHole)

      let calibrationVector = new Vector2(.5, .5)
      let calibrated = {
        so: startOuter.addVector2(calibrationVector),
        si: startInner.addVector2(calibrationVector),
        eo: endOuter.addVector2(calibrationVector),
        ei: endInner.addVector2(calibrationVector),
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

    logoLocation() {
      let PI2 = 2 * Math.PI;
      let startAngle = this.index * PI2 / this.sectorCount
      let endAngle = startAngle + PI2 / this.sectorCount
      let middle = Vector2.fromDirection((startAngle + endAngle) * .5)
        .multiply(.5) // scale to radius mode
        .multiply(.75) // location between inner & outer
        .add(.5 - .5 * this.ratioImage) // calibrate, and translate for half image size
        .multiply(100) // convert to %-units
      return middle
    },
  },

}
</script>

<style scoped lang="scss">

.sector {
  width: calc(var(--radius) * 2);
  aspect-ratio: 1;
  cursor: pointer;
  transition: .2s ease-in-out;
  opacity: .2;

  &:hover {
    opacity: .4;
  }
}

.logo-container {
  position: absolute;
  pointer-events: none;
  height: var(--ratio-image);
  aspect-ratio: 1;

  display: grid;
  justify-items: center;
  gap: .4em;
  grid-template-rows: 70% 30%;

  border-radius: 50%;
}

.logo-image {
  height: 100%;
}

.logo-label {
  text-align: center;
}

</style>
