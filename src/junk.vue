<template>
  <div class="drop-zone">
    <div
      v-for="item in getList(1)"
      :key="item.id"
      class="dragg-el"
      draggable="true"
    >
      {{ item.title }}
    </div>
    <div v-for="item in getList(2)" :key="item.id" class="dragg-el">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const items = ref([
      { id: 0, title: "Item A", list: 1 },
      { id: 1, title: "Item B", list: 1 },
      { id: 2, title: "Item C", list: 2 },
    ]);
    const getList = (list) => {
      return items.value.filter((item) => item.list == list);
    };
    return {
      getList,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.drop-zone {
  width: 50%;
  margin: 50px auto;
  background: #ecf0f1;
  padding: 10px;
  margin-top: 60px;
}

.dragg-el {
  background: #3498db;
  color: #fff;
  padding: 5px;
  margin-bottom: 10px;
}
</style>
