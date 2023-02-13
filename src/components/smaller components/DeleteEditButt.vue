<script setup>
import { useStore } from '../../state/store'
const store = useStore()
let props = defineProps({ id: Number, whiteIcons: Boolean })
const scrollUp = (scroll) => {
  scroll ? document.body.scrollIntoView({ behavior: "smooth" }) : null
}

</script>
<template>
  <!-- EDIT / DELETE BUTTONS -->
  <div class="deleteAndEdit">
    <router-link to="/edit">
      <img v-if="!props.whiteIcons" class="icon" src="../../assets/slices/ic_edit@3x.png">
      <img v-else class="icon" src="../../assets/slices/ic_edit_white@3x.png">
    </router-link>
    <button v-if="!props.whiteIcons" @click.prevent.stop="store.showAlert(props.id), scrollUp(false)"><img class="icon"
        src="../../assets/slices/ic_delete@3x.png"></button>
    <button v-else @click.prevent.stop="store.showAlert(props.id), scrollUp(false)"><img class="icon"
        src="../../assets/slices/ic_delete_white@3x.png"></button>
  </div>
</template>
<style scoped>
.deleteAndEdit .icon {
  width: 18px;
  height: 18px;
  margin: 10px 10px 16px 0;
}

.deleteAndEdit {
  justify-self: end;
}

.deleteAndEdit button {
  background-color: transparent;
}

@media (max-width: 500px) {
  .deleteAndEdit {
    justify-self: end;
    z-index: 20;
  }

  .deleteAndEdit .icon {
    width: 12px;
    height: 12px;
    margin: 0 5px 16px 0;
  }
}
</style>