<script>
import { ref } from "vue";
const Store = {
  //For start button
  start_frame: ref(false),
  classes: {
    active_all: ref(true),
  },
  boards: {
    board_1: ref(false),
    board_2: ref(false),
    board_3: ref(false),
    board_4: ref(false),
    board_5: ref(false),
    board_6: ref(false),
  },
};

export const toogle_board_class = (id) => {
  Store.boards[id].value = !Store.boards[id].value;
};

export default Store;
</script>
