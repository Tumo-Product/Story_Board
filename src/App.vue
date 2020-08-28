<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>
::-webkit-scrollbar {
        width: 0px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    ::-webkit-scrollbar-track {
        background-color: #fafafa;
    }
</style>
