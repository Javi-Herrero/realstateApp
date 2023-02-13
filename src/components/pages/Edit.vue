<script setup>
import BackArrow from '../smaller components/BackArrow.vue'
import Form from '../smaller components/Form.vue'
import { useStore } from '../../state/store'
const store = useStore()

</script>
<template>
    <BackArrow />
    <h1>Edit listing</h1>
    <Form v-if="store.selectedHouse" :isEdit="true" />
</template>
<style scoped>

</style>
