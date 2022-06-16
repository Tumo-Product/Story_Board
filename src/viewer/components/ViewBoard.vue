<template>
  <div class="view_space show">
    <div
      class="story"
      v-for="story in Object.keys(Store.boards).length"
      :key="story"
    >
      <ViewHoverButtons :id="story" />
      <div class="story_board">
        <div class="story_id">0{{ story }}</div>
        <div
          class="story_view_board"
          :class="{ empty_board: !Store.boards[story]['objcets'] }"
        ></div>
      </div>
      <div class="story_description">
        <img
          src="./../assets/icons/placeholder.png"
          v-if="!Store.boards[story]['content'].value != ''"
        />
        <p class="description">{{ Store.boards[story]["content"].value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Store from "@/Store.vue";
import ViewHoverButtons from "./ViewHoverButtons";
</script>

<style>
.view_space {
  display: flex;
  flex-wrap: wrap;
  padding: 17px 36px 20px 35px;
  column-gap: 20px;
  row-gap: 16px;
}
.story {
  width: 263px;
  height: 234px;
}

.story_board {
  width: 263px;
  height: 165px;
  background: #fff;
  border-radius: 7px;
  padding: 5.4px 8.21px 6px 8px;
  margin-bottom: 1px;
}

.story_id {
  width: 246.79px;
  height: 14.4px;
  background: #171c21;
  border-radius: 3px;
  font-family: "Fedra Sans Arm";
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  padding: 1.6px 5.89px 0.8px 0px;
  text-align: right;
  margin-bottom: 4.2px;
}

.empty_board {
  background: rgba(0, 0, 0, 0.06);
}

.story_view_board {
  width: 246.79px;
  height: 135px;
  border-radius: 3px;
}

.story_description {
  width: 263px;
  height: 68px;
  background: #ffffff;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 17px 5px 17px;
}

.description {
  width: 229px;
  height: 59px;
  font-family: "Fedra Sans Arm";
  font-style: normal;
  font-weight: 450;
  font-size: 8px;
  line-height: 10px;

  color: #171c21;
}

.story:hover .view_hower_buttons {
  opacity: 1;
  /* transition: 0.5s; */
}
</style>
