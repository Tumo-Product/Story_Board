<template>
  <div class="preview_story_boards">
    <div
      class="preview_story"
      v-for="story in Object.keys(Store.boards).length"
      :key="story"
      :class="{
        active_board: story == Store.slider_index.value,
        right_slide: Store.slider_index.value + 1 == story,
        left_slide: Store.slider_index.value - 1 == story,
        none:
          Store.slider_index.value > story + 1 ||
          Store.slider_index.value < story - 1,
      }"
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
      <div class="slider_index"></div>
    </div>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";

// function changeSlide(index) {
//   Store.slider_index.value = index;
// }
</script>

<style>
.preview_story_boards {
  padding: 29px 0 18.5px 0;
  width: 100%;
  height: 521px;
}
.preview_story {
  height: 452px;
  width: 721px;
  position: absolute;
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
}

.active {
  width: 36.23px;
  background: #fff;
}

.active_board {
  left: 90px;
}

.right_slide {
  left: 850px;
}

.left_slide {
  left: -670px;
}

.none {
  display: none;
}
</style>
