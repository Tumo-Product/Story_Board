<template>
  <button
    class="view"
    v-if="(Store.edit_mode.value || Store.view_mode.value) && Store.start.value"
    :class="{ show: Store.edit_mode }"
    @click="show_all_frames"
  >
    <div class="img_background_frame">
      <svg
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 1V3.625H1"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.5 14.25L13.5 11.625L17 11.625"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17 3.625L13.5 3.625L13.5 1"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 11.625L4.5 11.625L4.5 14.25"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </button>
</template>

<script setup>
import Store from "@/Store.vue";

function show_all_frames() {
  if (Store.edit_mode.value) {
    Store.edit_mode.value = false;
    Store.view_mode.value = true;
  } else {
    Store.edit_mode.value = true;
    Store.view_mode.value = false;
  }
}
</script>

<style>
.button_area .view {
  height: 40px;
  width: 40px;
  border: none;
  background: #171c21;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 21px;
  left: 42px;
}

.button_area .view:hover .img_background_frame {
  background: #fff;
}

.button_area .view .img_background_frame {
  transition: 0.5s;
}

.button_area .view:hover .img_background_frame svg {
  /* fill: #000; */
  filter: invert(100%);
}
</style>
