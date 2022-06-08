<template>
  <div
    v-if="Store.classes.active_all || Store.boards[`board_${props.id}`]"
    :class="{
      active_all: Store.classes.active_all.value,
      active: Store.boards[`board_${props.id}`].value,
    }"
  >
    <div class="board" :id="`board_${props.id}`" @click="show_board">
      <BoardSetup />
    </div>
    <div class="board_description" :id="`description_${props.id}`">
      <InputText v-if="Store.classes.active_all.value" />
    </div>
  </div>
</template>

<script setup>
import InputText from "./InputText";
import Store, { toogle_board_class } from "@/Store.vue";
import BoardSetup from "./BoardSetup";
const props = defineProps({ id: Number });

const show_board = (event) => {
  Store.classes.active_all.value = false;
  toogle_board_class(event.target.id);
};
</script>

<style>
.active_all {
  width: 30%;
  display: block !important;
}

.board {
  width: 100%;
  height: 100px;
}

.active {
  width: 100%;
  height: 100%;
}

.active .board {
  width: 100%;
  height: 100%;
}
</style>
