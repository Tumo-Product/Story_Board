<template>
  <div
    class="arrows"
    :class="{ show: Store.edit_mode }"
    v-if="Store.edit_mode.value"
  >
    <button class="prev" @click="prev">
      <div class="img_background_frame">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1L1 6L7 11"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>
    <button class="next" @click="next">
      <div class="img_background_frame">
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 6L1 11"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";

function next() {
  if (Store.board_to_edit.value < Object.keys(Store.boards).length)
    Store.board_to_edit.value += 1;
}
function prev() {
  if (Store.board_to_edit.value > 1) Store.board_to_edit.value -= 1;
}
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
  cursor: pointer;
}

.prev:hover .img_background_frame,
.next:hover .img_background_frame {
  background: #fff;
}

.prev:hover svg,
.next:hover svg {
  filter: invert(100%);
}
</style>
