<template>
  <div class="preview_story_boards" :class="{ smooth: !mouse_state }">
    <div
      class="preview_story"
      v-for="story in Object.keys(Store.boards).length"
      :key="story"
      @mousedown="toggle_mouse($event, true)"
      @mouseup="toggle_mouse($event, false)"
      @mouseleave="toggle_mouse($event, false)"
      @mousemove="move_slide"
      :class="{ current: story === Store.slider_index.value }"
    >
      <div class="preview_board">
        <div class="preview_id">0{{ story }}</div>
        <div class="preview_story"></div>
      </div>
      <div class="preview_description">
        <p>
          {{ Store.boards[Store.slider_index.value]["content"].value }}
        </p>
      </div>
    </div>
  </div>
  <div class="slider_index">
    <span
      v-for="index in Object.keys(Store.boards).length"
      :key="index"
      :class="{ active: Store.slider_index.value == index }"
      @click="change_slide(index)"
    ></span>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";
import { ref } from "vue";
let mouse_state = ref(false);
let start = ref(0);

let left = ref(
  Store.slider_index.value == 1
    ? 90
    : -630 - (Store.slider_index.value - 2) * 720
);

let startingLeft;

function toggle_mouse(event, val) {
  start.value = event.clientX;
  mouse_state.value = val;

  if (val) {
    startingLeft = left.value;
  } else {
    const offset = startingLeft - left.value;

    if (!offset) return;

    if (Math.abs(offset) >= 10) {
      let dir = Math.sign(offset);

      Store.slider_index.value += dir;
      left.value =
        Store.slider_index.value == 1
          ? 90
          : -630 - (Store.slider_index.value - 2) * 720;
    }

    startingLeft = undefined;
  }
}

function move_slide(event) {
  if (
    (Store.slider_index.value - 1 == 0 && event.clientX - start.value > 0) ||
    (Store.slider_index.value + 1 == 7 && event.clientX - start.value < 0)
  )
    return;
  if (mouse_state.value) {
    left.value += event.clientX - start.value;
    start.value = event.clientX;

    console.log(event.clientX - start.value);
  }
}

function change_slide(index) {
  if (Store.slider_index.value != index) {
    Store.slider_index.value = index;
    left.value =
      Store.slider_index.value == 1
        ? 90
        : -630 - (Store.slider_index.value - 2) * 720;
  }
}
</script>

<style>
.smooth {
  transition: 0.5s;
}

.preview_story_boards {
  padding: 29px 0 0 0;
  width: 100%;
  height: 481px;
  display: flex;
  /* justify-content: space-between;
  -moz-column-gap: 20px;
  column-gap: 20px; */
}
.preview_story {
  height: 452px;
  width: 721px;
  position: relative;
  left: v-bind(left + "px");
  transform: scale(0.9);
  opacity: 0.3;
  transition: 1s;
}

.preview_story.current {
  transform: scale(1);
  opacity: 1;
}
.preview_board {
  height: 371px;
  background: #fff;
  border-radius: 7px;
  padding: 10.43px 22.45px 13.49px 22px;
}
.preview_id {
  height: 27.89px;
  background: #171c21;
  border-radius: 3px;
  font-family: "Fedra Sans Arm";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;
  text-align: right;
  padding: 1.57px 9.55px 1.57px 0;
}
.preview_description {
  height: 79px;
  background: #fff;
  border-radius: 7px;
  margin-top: 2px;
  padding: 12px 47px 10px 47px;
  font-family: "Fedra Sans Arm";
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 15px;
  color: #171c21;
}

.slider_index {
  height: 3.5px;
  display: flex;
  column-gap: 5px;
  margin: 18px auto 0;
  width: min-content;
}
span {
  background: rgba(255, 255, 255, 0.2);
  display: inline-block;
  height: 3.5px;
  width: 9.23px;
  cursor: pointer;
  transition: 0.5s;
}

.active {
  width: 36.23px;
  background: #fff;
}
</style>
