<template>
  <v-btn :icon="themeIcon" @click="toggleTheme" />
</template>

<script lang="ts">
import { firebaseService, themeService, ThemeType, ThemeTypeEnum } from '../services'

let themeIconMap = {
  [ThemeTypeEnum.Light]: 'mdi-white-balance-sunny',
  [ThemeTypeEnum.Dark]: 'mdi-weather-night',
}

export default {
  name: 'ThemeController',

  emits: {
    themeName: {
      type: String,
    },
  },

  data: () => ({
    themeName: undefined,
  }),

  computed: {
    themeIcon(): string {
      return themeIconMap[this.themeName]
    },
  },

  methods: {
    toggleTheme() {
      this.setTheme(themeService.toggleTheme())
      firebaseService.log(`Toggle color scheme to ${this.themeName}`)
    },

    setTheme(theme: ThemeType) {
      this.themeName = theme

      this.$emit('themeName', theme)

      // on mobile, a light color column is left on the right side
      document.body.style.backgroundColor = this.themeName === 'dark'
        ? 'rgb(18,18,18)'
        : ''
    },
  },

  created() {
    this.setTheme(themeService.getTheme())
  }
}
</script>

<style scoped lang="scss">
</style>
