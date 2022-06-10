<script setup>
import StartButton from "./components/StartButton";
import UserFrames from "./components/UserFrames";
import Store from "@/Store.vue";
</script>

<template>
  <StartButton v-if="!Store.start_frame.value" />
  <UserFrames v-if="Store.start_frame.value" />
</template>

<style>
@font-face {
  font-family: "Fedra Sans Alt Pro";
  src: local("Fedra Sans Alt Pro"),
    url(./../fonts/Fedra/FedraSansAltPro-Medium.otf) format("truetype");
}
</style>
