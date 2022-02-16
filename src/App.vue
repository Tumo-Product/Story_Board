<template>
  <v-app>
    <div class="info-text">
      This plugin working only with activity manager.
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  mounted() {
    console.log('version-2')
  }
};
</script>

<style>
  .info-text {
    margin-top: 300px;
    text-align: center;
    font-size: 22px;
  }
</style>
