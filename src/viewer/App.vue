<script setup>
import StartButton from "./components/StartButton";
</script>

<template>
  <StartButton />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  width: 900px;
  height: 600px;
}
@font-face {
  font-family: "Fedra Sans Alt Pro";
  src: local("Fedra Sans Alt Pro"),
    url(./../fonts/Fedra/FedraSansAltPro-Medium.otf) format("truetype");
}
@font-face {
  font-family: "Fedra Sans Arm Light";
  src: local("Fedra Sans Arm Light"),
    url(./../fonts/Fedra/FedraSansArm-Light.otf) format("truetype");
}
</style>
