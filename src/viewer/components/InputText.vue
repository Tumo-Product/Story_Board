<template>
  <input type="text" :maxlength="MAX_CHAR_COUNT" v-model="text" />
  <div class="char_count" v-text="MAX_CHAR_COUNT - text.length"></div>
</template>

<script setup>
import { ref } from "vue";
//MAX_CHAR_COUNT get the maximum of allowed characters
const MAX_CHAR_COUNT = 36;
const text = ref("");
</script>

<style>
input {
  width: 100%;
  height: 30px;
}
</style>
