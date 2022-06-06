<template>
  <button @click="on_start_button_click">Start</button>
</template>

<script setup>
import Store from "@/Store.vue";

//Default value of Store.start_frame is false
function on_start_button_click() {
  Store.start_frame.value = !Store.start_frame.value;
}
</script>
