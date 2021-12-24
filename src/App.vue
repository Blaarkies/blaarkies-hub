<template>
  <v-theme-provider :theme="themeName">
    <v-app>
      <v-main>
        <div class="stack layout-app">
          <div class="theme-buttons">
            <v-btn :icon="themeIcon" @click="toggleTheme" />
          </div>

          <div class="radial-container-size-wrapper">
            <RadialContainer :config="mainRadialContainerConfig" />
          </div>
        </div>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script lang="ts">
import { userThemePreferenceKey } from './common/localStorageKeys'
import RadialContainer from './components/RadialContainer.vue';
import { firebaseService, themeService } from './services';
import { MainRadialContainerConfig } from './common/componentConfig';

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
  name: 'App',

  components: {
    RadialContainer,
  },

  data: () => ({
    themeName: undefined,
    mainRadialContainerConfig: MainRadialContainerConfig,
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
      themeService.setTheme(this.themeName)
    },
  },

  created() {
    let localPreference = localStorage.getItem(userThemePreferenceKey)
    if (localPreference && themeMap.includes(localPreference)) {
      this.themeName = localPreference
      themeService.setTheme(this.themeName)
      return
    }

    const browserPreferenceDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    this.themeName = browserPreferenceDarkMode ? 'dark' : 'light'
    themeService.setTheme(this.themeName)
  }
}
</script>

<style scoped lang="scss">

.theme-buttons {
  display: flex;
  margin-left: auto;
  justify-content: end;
  padding: 20px;
}

.layout-app {
  height: 100%;
  width: 100%;
}

.radial-container-size-wrapper {
  height: 100vh;
  //width: 100vw; // TODO: only resizes on height changes now. adding width: breaks aspect-ratio
  aspect-ratio: 1;
  padding: 4em;
  place-self: center;
}

</style>

<!--Global-->
<style lang="scss">
@use "styles/main";
</style>
