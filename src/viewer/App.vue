<script setup>
import StartButton from "./components/StartButton";
import UserFrames from "./components/UserFrames";
import Store from "@/Store.vue";
</script>

<template>
  <StartButton v-if="!Store.start_frame.value" />
  <UserFrames v-if="Store.start_frame.value" />
</template>

<style></style>
