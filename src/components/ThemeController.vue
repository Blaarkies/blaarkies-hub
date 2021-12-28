<template>
  <v-btn :icon="themeIcon" @click="toggleTheme" />
</template>

<script lang="ts">
import { userThemePreferenceKey } from '../common';
import { firebaseService, themeService, ThemeType } from '../services';

let themeMap = {
  'light': 'dark',
  'dark': 'light',
  includes: (theme: string) => Object.keys(themeMap).includes(theme),
}
let themeIconMap = {
  'light': 'mdi-white-balance-sunny',
  'dark': 'mdi-weather-night',
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
      return themeIconMap[this.themeName];
    },
  },

  methods: {
    toggleTheme() {
      this.themeName = themeMap[this.themeName] ?? 'dark'
      localStorage.setItem(userThemePreferenceKey, this.themeName)
      this.setTheme(this.themeName)

      firebaseService.log(`Toggle color scheme to ${this.themeName}`)
    },

    setTheme(theme: ThemeType) {
      themeService.setTheme(theme)

      this.$emit('themeName', theme)

      // on mobile, a light color column is left on the right side
      document.body.style.backgroundColor = this.themeName === 'dark'
        ? 'rgb(18,18,18)'
        : '';
    },
  },

  created() {
    let localPreference = localStorage.getItem(userThemePreferenceKey)
    if (localPreference && themeMap.includes(localPreference)) {
      this.themeName = localPreference
      this.setTheme(this.themeName)
      return
    }

    const browserPreferenceDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    this.themeName = browserPreferenceDarkMode ? 'dark' : 'light'
    this.setTheme(this.themeName)

    firebaseService.log(`Default color scheme was ${this.themeName}`)
  }
}
</script>

<style scoped lang="scss">
</style>
