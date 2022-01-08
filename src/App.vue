<template>
  <v-theme-provider :theme="themeName">
    <v-app>
      <v-main>
        <div class="stack layout-app">
          <div class="theme-buttons">
            <ThemeController @themeName="themeName = $event" />
          </div>

          <div class="main-content">
            <div class="text title center">Blaarkies Hub</div>

            <RadialContainer :config="mainRadialContainerConfig" />
          </div>

        </div>
      </v-main>
    </v-app>
  </v-theme-provider>
</template>

<script lang="ts">
import RadialContainer from './components/RadialContainer.vue'
import ThemeController from './components/ThemeController.vue'
import { MainRadialContainerConfig } from './common'

export default {
  name: 'App',

  components: {
    ThemeController,
    RadialContainer,
  },

  data: () => ({
    themeName: undefined,
    mainRadialContainerConfig: MainRadialContainerConfig,
  }),

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
  padding: 4em;
  place-self: center;
}

.main-content {
  padding: 20px;
}

</style>

<!--Global-->
<style lang="scss">
@use "styles/main";
</style>
