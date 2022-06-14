<template>
  <div
    class="first_frame"
    v-if="Store.animate_button.value && !Store.start.value"
    :class="{ show: Store.animate_button.value }"
  >
    <div class="first_frame_board">
      <div class="id">01</div>
      <div class="board"></div>
    </div>
    <div class="first_fram_content">
      <img src="./../assets/icons/placeholder.png" alt="" />
    </div>
    <button class="start_button_first_frame" @click="show_first_frame">
      <img src="./../assets/icons/plus.svg" alt="" />
    </button>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";

function show_first_frame() {
  Store.edit_mode.value = true;
  Store.start.value = true;
}
</script>

<style scoped>
.first_frame {
  height: 423px;
  width: 263px;
  margin: 0 auto;
  padding-top: 138px;
}

.first_frame_board {
  width: 100%;
  height: 165px;
  background: #ffffff;
  border-radius: 7px;
  margin-bottom: 1px;
  padding: 5.4px 8.11px 0 8.11px;
  opacity: 0.2;
}
.id {
  background: #171c21;
  height: 14.4px;
  border-radius: 3px;
  text-align: right;
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  font-family: "Fedra Sans Arm Light";
  padding: 1.6px 5.89px 0.8px 0;
}

.board {
  background: rgba(0, 0, 0, 0.06);
  height: 135px;
  margin-top: 4.2px;
  border-radius: 3px;
}

.first_fram_content {
  background: #ffffff;
  border-radius: 7px;
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
}

.start_button_first_frame {
  background: #f56b49;
  height: 51px;
  width: 51px;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
}

.start_button_first_frame img {
  transition: 0.5s;
}

.start_button_first_frame img:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
