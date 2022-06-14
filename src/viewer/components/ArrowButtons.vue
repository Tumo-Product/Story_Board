<template>
  <div
    class="arrows"
    :class="{ show: Store.edit_mode }"
    v-if="Store.edit_mode.value"
  >
    <button class="prev">
      <img src="./../assets/icons/prev.svg" alt="" />
    </button>
    <button class="next">
      <img src="./../assets/icons/next.svg" alt="" />
    </button>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";
</script>

<style scoped>
.button_area .arrows {
  width: 85px;
  height: 40px;
  background: #171c21;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 5px;
  position: absolute;
  bottom: 22px;
  left: 293px;
}
.button_area .arrows button {
  border: none;
  background: none;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
