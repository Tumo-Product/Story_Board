<script>
import { ref } from "vue";
const Store = {
  animate_button: ref(false),
  start: ref(false),
  edit_mode: ref(false),
  view_mode: ref(false),
  board_to_edit: ref(1),
  slider_index: ref(1),
  saved_status: ref(false),
  preview_mode: ref(false),
  view_button: ref(false),
  boards: {
    1: { objects: {}, content: ref("") },
    2: { objects: {}, content: ref("") },
    3: { objects: {}, content: ref("") },
    4: { objects: {}, content: ref("") },
    5: { objects: {}, content: ref("") },
    6: { objects: {}, content: ref("") },
  },
  categories: [
    { name: "background", state: ref(true) },
    { name: "background_assets", state: ref(false) },
    { name: "objcets", state: ref(false) },
    { name: "characters", state: ref(false) },
  ],
  MAX_INPUT_LENGTH: 200,
};

export default Store;
</script>
