<template>
  <div class="working_space show">
    <div class="edit_frame">
      <div class="edit_board">
        <div class="edit_id">0{{ current_board_id }}</div>
        <div class="board"></div>
      </div>
      <div class="edit_description">
        <!-- Input Vue -->
        <InputFrame :id="current_board_id" />
      </div>
    </div>
    <!-- Assets Vue -->
    <div class="categories">
      <EditFrameCategoriesVue />
    </div>
  </div>
</template>

<script setup>
import InputFrame from "./InputFrame";
import EditFrameCategoriesVue from "./EditFrameCategories";
import { onMounted, watch } from "@vue/runtime-core";
import { ref } from "vue";
import Store from "@/Store.vue";
let current_board_id = ref(Store.board_to_edit.value);
onMounted(() => {
  Store.edit_mode.value = true;
});
watch(Store.board_to_edit, () => {
  current_board_id.value = Store.board_to_edit.value;
});
</script>

<style>
.working_space {
  width: 900px;
  height: 521px;
  display: flex;
  padding: 23px 42px 10px 39px;
  gap: 39px;
}

.edit_board {
  background: #ffffff;
  border-radius: 7px;
  height: 371px;
  width: 603px;
  padding: 10.43px 18.77px 13.49px 18.4px;
}

.board {
  margin-top: 5.75px;
  height: 313.51px;
  border-radius: 3px;
  background: url("./../assets/icons/grid.png") rgba(0, 0, 0, 0.06);
}

.edit_id {
  background: #171c21;
  border-radius: 3px;
  text-align: right;
  padding: 1.57px 13.23px 1.25px 0;
  height: 27.82px;
  width: 565.83px;
  font-family: "Fedra Sans Arm";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;
}

.edit_description {
  margin-top: 2px;
  background: #ffffff;
  border-radius: 7px;
  height: 115px;
  width: 603px;
  padding: 12px 7px 6px 25px;
  color: #b2b8bd;
  font-family: "Fedra Sans Arm";
  font-style: normal;
  font-weight: 450;
  font-size: 11px;
  line-height: 14px;
}

.categories_types {
  background: #ffffff;
  border-radius: 3px;
  height: 51px;
  width: 177px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.categories_assets {
  width: 177px;
  height: 435px;
  background: #ffffff;
  border-radius: 3px;
  margin-top: 2px;
}
</style>
