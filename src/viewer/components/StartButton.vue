<template>
  <main>
    <!-- Change class names!!!-->
    <div class="starting_area" :class="{ slide_down: animate_button }">
      <div class="tool_name" :class="{ hide: animate_button }">
        <h1>Story Telling</h1>
      </div>
    </div>
    <div
      class="button_area"
      :class="{ slide_down_button_area: animate_button }"
    >
      <button
        @click="on_start_button_click"
        :class="{ to_circle: animate_button }"
      >
        <img
          src="./../assets/icons/button_arrow.svg"
          alt=""
          v-if="!animate_button"
        />
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
// import Store from "@/Store.vue";
let animate_button = ref(false);

//Default value of Store.start_frame is false
function on_start_button_click() {
  animate_button.value = true;
  setTimeout(() => {
    // Store.start_frame.value = !Store.start_frame.value;
  }, 400);
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  width: 900px;
  height: 600px;
}

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
}

.button_area button {
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

.hide {
  animation: hide 0.5s ease forwards;
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
</style>
