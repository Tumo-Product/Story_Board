<template>
  <main>
    <!-- Change class names!!!-->
    <div
      class="starting_area"
      :class="{ slide_down: Store.animate_button.value }"
    >
      <FirstFrame v-if="first_usage" />
      <EditBoard v-if="Store.edit_mode.value" />

      <div class="tool_name" :class="{ hide: Store.animate_button.value }">
        <h1>Story Telling</h1>
      </div>
    </div>

    <div
      class="button_area"
      :class="{ slide_down_button_area: Store.animate_button.value }"
    >
      <button
        class="start"
        @click="on_start_button_click"
        :class="{ to_circle: Store.animate_button.value }"
      >
        <img
          src="./../assets/icons/button_arrow.svg"
          alt=""
          v-if="!Store.animate_button.value"
        />
      </button>
      <ViewButton />
      <ArrowButtons />
    </div>
  </main>
</template>

<script setup>
import Store from "@/Store.vue";
import FirstFrame from "./FirstFrame";
import EditBoard from "./EditBoard";
import ViewButton from "./ViewButton";
import ArrowButtons from "./ArrowButtons";

//Testing values need to be deleted
let first_usage = true;
//END OF TESTING VALUES

//Default value of Store.start_frame is false
function on_start_button_click() {
  if (first_usage) {
    Store.animate_button.value = !Store.animate_button.value;
  }
}
</script>

<style>
.starting_area {
  width: 900px;
  height: 419px;
  color: #fff;
  background: #171c21;
  position: relative;
}
.tool_name {
  position: absolute;
  bottom: 28px;
  left: 42px;
  font-family: "Fedra Sans Alt Pro";
}

.button_area {
  height: 181px;
  position: relative;
  background: url("./../assets/icons/grid.png");
  background-size: 100%;
  background-position: bottom center;
}

.button_area .start {
  width: 90px;
  height: 51px;
  background: #f56b49;
  border-radius: 36.5px;
  position: absolute;
  border: none;
  color: #fff;
  bottom: 37px;
  right: 85px;
}
.button_area .start img {
  transition: 0.5s;
}
.button_area .start img:hover {
  opacity: 0.5;
  cursor: pointer;
}

.hide {
  animation: hide 0.5s ease forwards;
}
.show {
  animation: show 0.5s ease forwards;
}
.to_circle {
  animation: to_circle 0.5s ease forwards, hide 0.5s ease forwards;
}

.slide_down {
  animation: slide_down 0.5s ease forwards;
}

.slide_down_button_area {
  animation: slide_down_button_area 0.5s ease forwards;
}

/* ANIMATIONS */
@keyframes slide_down_button_area {
  0% {
    height: 181px;
  }
  100% {
    height: 79px;
  }
}

@keyframes slide_down {
  0% {
    height: 419px;
  }
  100% {
    height: 521px;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

@keyframes to_circle {
  0% {
    width: 90px;
  }
  100% {
    width: 51px;
  }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Global Classes */
.button_area .view .img_background_frame {
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
}
</style>
