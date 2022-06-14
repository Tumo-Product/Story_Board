<script>
import { ref } from "vue";
const Store = {
  animate_button: ref(false),
  start: ref(false),
  edit_mode: ref(false),
  view_mode: ref(false),
  boards: {
    1: { objects: {}, content: "" },
    2: { objects: {}, content: "" },
    3: { objects: {}, content: "" },
    4: { objects: {}, content: "" },
    5: { objects: {}, content: "" },
    6: { objects: {}, content: "" },
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
