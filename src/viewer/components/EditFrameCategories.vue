<template>
  <div class="categories_types">
    <div
      class="type"
      :class="{
        active_type: Store.categories[category_index - 1].state.value,
      }"
      v-for="category_index in Store.categories.length"
      :key="category_index"
      @click="activate_this_category"
    >
      <button :id="category_index - 1">
        <div></div>
      </button>
    </div>
  </div>
  <div class="categories_assets">
    <ObjectBoard />
  </div>
</template>

<script setup>
import Store from "@/Store.vue";
import ObjectBoard from "./ObjectBoard.vue";
const activate_this_category = (e) => {
  let id = e.target.children[0].id;
  Store.categories.forEach((category) => (category.state.value = false));
  Store.categories[id].state.value = true;
};
</script>

<style scoped>
.type {
  width: 38px;
  height: 38px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.type button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  pointer-events: none;
}
.type button div {
  border: none;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  background: #171c21;
}

.active_type {
  background: #f56b49;
}

.categories_assets {
  padding: 6px;
  overflow: overlay;
}

.categories_assets::-webkit-scrollbar {
  display: none;
}
</style>
