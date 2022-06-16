<template>
  <div class="view_hower_buttons">
    <div class="hover_buttons">
      <button class="edit" @click="edit_current_board">
        <img src="./../assets/icons/edit.svg" alt="" />
      </button>
      <button class="preview" @click="preview_all_boards">
        <img src="./../assets/icons/preview.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";
const props = defineProps(["id"]);

function edit_current_board() {
  Store.board_to_edit.value = props.id;
  Store.edit_mode.value = true;
  Store.view_mode.value = false;
  Store.saved_status.value = false;
}

function preview_all_boards() {
  Store.view_button.value = true;
  Store.view_mode.value = false;
  Store.preview_mode.value = true;
  Store.slider_index.value = props.id;
}
</script>

<style>
.view_hower_buttons {
  height: 234px;
  width: 263px;
  position: absolute;
  opacity: 0;
  background: rgba(23, 28, 33, 0.76);
  border-radius: 7px;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hover_buttons {
  width: 85px;
  height: 40px;
  background: #ffffff;
  border-radius: 28px;
  padding: 4px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hover_buttons button {
  border: none;
  width: 32px;
  height: 32px;
  background: #171c21;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1 !important;
}
</style>
