<script setup>
import Item from './HouseItem.vue'
import { onMounted } from 'vue'
import { useStore } from '../../state/store'
const store = useStore()
const props = defineProps(['isRecommend'])
onMounted(() => {
  store.getData()

})
let recommendedArray = []
if (props.isRecommend) {/// making the recommendations array
  for (let i = 0; i < 3; i++) {
    let number = Math.floor(Math.random() * (store.showHouseList.length))
    if (recommendedArray.includes(store.showHouseList[number]) || recommendedArray.includes(store.selectedHouse)) {
      i = 0
      recommendedArray = []
    }
    recommendedArray.push(store.showHouseList[number])
  }
}
</script>
<template>
  <div v-if="!props.isRecommend">
    <h2 v-if="store.filteredSortedHouses && store.filteredSortedHouses.length > 0">{{
      store.filteredSortedHouses.length
    }}
      results found
    </h2>
    <div class="notFound" v-if="store.filteredSortedHouses && store.filteredSortedHouses.length === 0">
      <img v-if="store.filteredSortedHouses && store.filteredSortedHouses.length === 0"
        src="../../assets/slices/img_empty_houses@3x.png" />
      <p>No results found. </p>
      <p>Please try another keyword. </p>
    </div>
    <div v-if="store.showHouseList === 'loading'">
      <Item :isLoading="true" />
    </div> <!-- //loading screen -->
    <div v-else class="houseList">
      <Item v-if="!store.filteredSortedHouses" v-for="(item, index) in store.showHouseList" :isLoading="false"
        :image="item.image" :streetName='item.location.street' :price='item.price' :zip="item.location.zip"
        :city="item.location.city" :bedrooms='item.rooms.bedrooms' :bathrooms='item.rooms.bathrooms' :size='item.size'
        :id="item.id" :madeByMe="item.madeByMe" :key="index" />
      <Item v-else v-for="(item) in store.filteredSortedHouses" :isLoading="false" :image="item.image"
        :streetName='item.location.street' :price='item.price' :zip="item.location.zip" :city="item.location.city"
        :bedrooms='item.rooms.bedrooms' :bathrooms='item.rooms.bathrooms' :size='item.size' :id="item.id"
        :madeByMe="item.madeByMe" />
    </div>
  </div>
  <div v-else>
    <Item v-for="(item, index) in recommendedArray" :isLoading="false" :image="item.image"
      :streetName='item.location.street' :price='item.price' :zip="item.location.zip" :city="item.location.city"
      :bedrooms='item.rooms.bedrooms' :bathrooms='item.rooms.bathrooms' :size='item.size' :id="item.id"
      :madeByMe="item.madeByMe" :key="index" :isRecommended="true" />
  </div>
</template>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.notFound img {
  transform: scale(.5);
  animation: fadeIn 1500ms;
  width: 100%;
  text-align: center;
}

.notFound p {
  text-align: center;
}
</style>
