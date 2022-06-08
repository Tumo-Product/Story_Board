<template>
  <main>
    <!-- Change class names!!!-->
    <div class="starting_area">
      <div class="tool_name">
        <h1>Story Telling</h1>
      </div>
    </div>
    <div class="button_area">
      <button @click="on_start_button_click">Start</button>
    </div>
  </main>
</template>

<script setup>
import Store from "@/Store.vue";

//Default value of Store.start_frame is false
function on_start_button_click() {
  Store.start_frame.value = !Store.start_frame.value;
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  width: 900px;
  height: 600px;
}

.starting_area {
  width: 100%;
  height: 60vh;
  color: #fff;
  background: #000;
  position: relative;
}
.tool_name {
  position: absolute;
  bottom: 10px;
  left: 20px;
}

.button_area {
  background: grey;
  height: 40vh;
  position: relative;
}

.button_area button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: orange;
}
</style>
