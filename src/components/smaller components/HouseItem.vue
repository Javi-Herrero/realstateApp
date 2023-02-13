<script setup>
import DeleteEditButt from '../smaller components/DeleteEditButt.vue'
import { useStore } from '../../state/store'
const store = useStore()
let props = defineProps({
  isLoading: Boolean,
  id: Number,
  image: String,
  streetName: String,
  price: Number,
  zip: String,
  city: String,
  bedrooms: Number,
  bathrooms: Number,
  size: Number,
  madeByMe: Boolean,
  isRecommended: Boolean

})
const scrollUp = (scroll) => {
  scroll ? document.body.scrollIntoView({ behavior: "smooth" }) : null
}
</script>
<template>
  <!-- HOUSE DESCRIPTION -->
  <div v-if="isLoading" class="load" />
  <router-link v-else @click="store.selectHouse(props.id), scrollUp(true)" to="/detail">
    <div class="houseItem" :class="{ recommended: props.isRecommended }">
      <img class="thumb" :src="props.image" alt="house" />
      <section class="houseDescriptionSmall">
        <div class="title">
          <h2>{{ props.streetName }} </h2>
          <p class="listingInfo">€ {{ props.price.toLocaleString("nl-NL") }}</p>
          <p class="bodyText">{{ props.zip }} {{ props.city }}</p>
        </div>
        <div class="icons">
          <img class="icon" src="../../assets/slices/ic_bed@3x.png">
          <p class="listingInfo singleValue ">{{ props.bedrooms }}</p>
          <img class="icon" src="../../assets/slices/ic_bath@3x.png">
          <p class="listingInfo singleValue">{{ props.bathrooms }}</p>
          <img class="icon" src="../../assets/slices/ic_size@3x.png">
          <p class="listingInfo singleValue">{{ props.size }} m2</p>
        </div>
      </section>
      <DeleteEditButt v-if="props.madeByMe && !props.isRecommended" :id="props.id" />

    </div>
  </router-link>
  <br>
</template>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}

a * {
  transition: transform 100ms, box-shadow 100ms;
}

a :hover {
  box-shadow: 2px 8px 9px #5a5858c8;
  transform: scale(1.01);
}

a :hover :hover {
  box-shadow: none;
  transform: none;
}

a:visited {
  color: inherit;
}

.load {
  margin: 10% 45%;
  border: 20px solid var(--element-TERTIARY-dark);
  border-radius: 50%;
  border-top: 20px solid var(--element-PRIMARY);
  width: 100px;
  height: 100px;
  opacity: 0.5;
  animation: rotate 750ms ease-out infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

.houseItem {
  line-height: 16px;
  padding-top: 5px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 180px auto 100px;
  background-color: var(--element-BACKGROUND);
  border-radius: 6px;
  min-width: fit-content;
  animation: fadeIn 400ms;
}

.houseItem.recommended {
  line-height: 16px;
  padding-top: 5px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 180px auto auto;
  background-color: var(--element-BACKGROUND);
  border-radius: 6px;
  animation: fadeIn 400ms;
}



@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.houseItem .thumb {
  width: 150px;
  height: 150px;
  margin: 15px;
  border-radius: 6px;
  object-fit: cover;
  object-position: 0 0;
  animation: fadeIn 500ms;
}

.title {
  padding-top: 5px;
}

.houseItem .icon {
  width: 18px;
  height: 18px;
  margin: 10px 10px 16px 0;
}

.houseItem .icons {
  display: flex;
  flex-direction: row;
}

.listingInfo.singleValue {
  margin: 10px 16px 0 0;
}

@media (max-width: 500px) {
  .houseItem .thumb {
    width: 85px;
    height: 85px;
    margin: 10px;
    align-self: center;
  }

  .houseItem {
    line-height: 12px;
    padding-top: 0px;
    grid-template-columns: 105px auto auto;
    min-width: 280px;
  }

  .houseItem .icon {
    width: 14px;
    height: 14px;
    margin: 10px 5px 16px 0;
  }

  .listingInfo.singleValue {
    margin: 10px 8px 0 0;
  }

  .title p,
  .title h2 {
    margin: 5px;
  }

  .deleteAndEdit {
    min-width: 60px;
  }
}
</style>
