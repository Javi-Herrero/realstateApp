<script setup>
import { useStore } from '../../state/store'
const store = useStore()
const props = defineProps(['isMob'])
</script>
<template>
  <router-link to="/" @click="store.activeTab = 'home', store.deselectHouse()">
    <span v-if="!props.isMob" class="backButtonLabel">
      <img id="arrBack" src="../../assets/slices/ic_back_grey@3x.png" alt="back" />
      <p>Back to overview </p>
    </span>
    <span v-else class="backButtonLabel mob">
      <img id="arrBack" src="../../assets/slices/ic_back_white@3x.png" alt="back" />
    </span>
  </router-link>
</template>
<style scoped>
.backButtonLabel {
  display: inline-block;
  width: 100%;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: var(--semi);
  color: var(--text-PRIMARY);
}

.backButtonLabel img {
  float: left;
  position: relative;
  top: -7px;
  left: 5px;
  transform: scale(0.35);
}

a {
  text-decoration: none;
}

.mob {
  position: fixed;
  top: 30px;
  background-color: transparent;
  z-index: 10;
}
</style>
