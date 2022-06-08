// Frames for user to work on their stories
<template>
  <div class="frames_board">
    <BoardFrame v-for="id in MAX_FRAMES_COUNT" :key="id" :id="id" />
  </div>
</template>
<script setup>
import BoardFrame from "./BoardFrame";
const MAX_FRAMES_COUNT = 6;
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.frames_board {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
