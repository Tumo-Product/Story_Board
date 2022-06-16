<template>
  <div
    class="save_button"
    v-if="Store.view_mode.value"
    :class="{ show: Store.view_mode }"
  >
    <button
      class="save"
      @click="save"
      :class="{ saved: Store.saved_status.value }"
    >
      <img src="./../assets/icons/save.svg" alt="" />
    </button>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";

function save() {
  Store.saved_status.value = !Store.saved_status.value;
}
</script>

<style scoped>
.button_area .save_button {
  width: 76px;
  height: 40px;
  background: #171c21;
  border-radius: 28px;
  position: absolute;
  bottom: 21px;
  left: 412px;
  display: flex;
  align-items: center;
  padding: 4px 5px;
}

.button_area .save_button .save {
  border: none;
  height: 32px;
  width: 32px;
  background: #ffffff;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}
.saved {
  left: 35px;
  background: #b4f549 !important;
}
</style>
