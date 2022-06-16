<template>
  <textarea
    maxlength="200"
    v-model="Store.boards[props.id]['content'].value"
  ></textarea>
  <div class="character_count">
    {{ Store.boards[props.id]["content"].value.length }}/{{
      Store.MAX_INPUT_LENGTH
    }}
  </div>
</template>

<script setup>
import Store from "@/Store.vue";

const props = defineProps(["id"]);
</script>

<style>
textarea {
  border: 1px solid #b2b8bd;
  border-radius: 3px;
  height: 80px;
  width: 553px;
  resize: none;
  outline: none;
  font-family: "Fedra Sans Arm";
  font-style: normal;
  font-weight: 450;
  font-size: 11px;
  line-height: 14px;
  color: #171c21;
}
.character_count {
  text-align: right;
}
</style>
