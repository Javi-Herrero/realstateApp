<script setup>
import { useStore } from '../../state/store'
const store = useStore()
</script>
<template>
  <article class="back" v-if="store.alert">
    <div class="alert">
      <h1>Delete Listing</h1>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action cannot be undone.</p>
      <div class="buttons">
        <router-link to="/" @click="store.showAlert('delete')"><button>Yes, delete</button></router-link>
        <button class="cancel" @click="store.showAlert()">Cancel</button>
      </div>
    </div>
  </article>
</template>
<style scoped>
.alert {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 2px 8px 9px #5a5858c8;
  text-align: center;
  position: fixed;
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  background-color: var(--element-BACKGROUND);
}

.back {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  height: 100%;
  width: 100%;
  background: rgba(74, 75, 76, 0.567);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cancel {
  background-color: var(--element-SECONDARY);
}

button {
  width: 100%;
}

@media (max-width: 500px) {
  .alert {
    font-size: 12px;
    position: fixed;
    top: 30%;
    right: 8%;
    bottom: 30%;
    left: 8%;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
  }

  a button {
    width: 100%;
  }

  button.cancel {
    width: 50%;
  }
}
</style>