<script setup>
import NavBar from './components/smaller components/NavBar.vue'
import Alert from './components/smaller components/Alert.vue'
import { useStore } from './state/store'
const store = useStore()
</script>
<template>
  <NavBar />
  <main class="main">
    <router-view></router-view>
  </main>
  <Alert />
</template>

<style scoped>
.main {
  margin-left: 15%;
  margin-right: 15%;
}

@media (max-width: 500px) {
  .App {
    width: 85vh;
  }

  .main {
    margin-left: 8%;
    margin-right: 8%;
  }
}
</style>
