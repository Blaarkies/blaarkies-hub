<template>
  <v-app theme="">
    <v-main>
      <RadialContainer />
    </v-main>
  </v-app>
</template>

<script>
import {RadialContainer} from './components';

export default {
    name: 'App',

    components: {
        RadialContainer,
    },

    data: () => ({
        //
    }),
}
</script>
