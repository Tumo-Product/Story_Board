<script>
if (
  (startingLeft == -3510 && +(event.clientX - start.value) > 0) ||
  (startingLeft == 90 && +(event.clientX - start.value) < 0) ||
  startingLeft < 90
) {
  console.log(event.clientX - start.value, startingLeft);

  left.value += event.clientX - start.value;
  start.value = event.clientX;
}

function move_slide(event) {
  if (mouse_state.value) {
    if (startingLeft == 90 && +(event.clientX - start.value) < 0) {
      console.log(event.clientX - start.value, startingLeft);

      left.value += event.clientX - start.value;
      start.value = event.clientX;
    }
    else if( (startingLeft == -3510 && +(event.clientX - start.value) > 0))
  }
}
</script>
