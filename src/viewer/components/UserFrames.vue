// Frames for user to work on their stories
<template>
  <div class="frames_board">
    <div class="user_frame" v-for="id in MAX_FRAMES_COUNT" :key="id">
      <div class="working_board"></div>
      <div class="board_description">
        <InputText />
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from "./InputText";
const MAX_FRAMES_COUNT = 6;
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.frames_board {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 10px 10px;
}
.user_frame {
  width: 30%;
  height: 40vh;
}
.working_board {
  height: 50%;
  border: 1px solid;
}
.board_description {
  display: flex;
}
</style>
