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
import { ref, watch } from "vue";
let left = ref(0);
function save() {
  Store.saved_status.value = !Store.saved_status.value;
}

watch(Store.saved_status, () => {
  if (Store.saved_status.value) left.value = 35;
  else left.value = 0;
});
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
  transition: ease-in-out 0.5s;
  left: v-bind(left + "px");
}
.saved {
  /* left: 35px; */
  background: #b4f549 !important;
}
</style>
