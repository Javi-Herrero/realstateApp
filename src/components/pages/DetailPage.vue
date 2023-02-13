<script setup>
import BackArrow from '../smaller components/BackArrow.vue'
import HouseList from '../smaller components/HouseList.vue'
import DeleteEditButt from '../smaller components/DeleteEditButt.vue'
import { useStore } from '../../state/store'
const store = useStore()
</script>
<template>
  <BackArrow @click="store.selectedHouse = null" :isMob="true" class="arrowmob" />
  <BackArrow @click="store.selectedHouse = null" :isMob="false" class="arrowdesk" />
  <div v-if="!store.selectedHouse" class="load"></div>
  <p class="loadText" v-if="!store.selectedHouse"> This might take a while...</p>
  <div v-else class="container mob">
    <section class="detail">
      <img class="houseCoverDesk" :src="store.selectedHouse.image" alt="house">
      <div class="info">
        <div class="name-Icons">
          <h1>{{ store.selectedHouse.location.street }}</h1>
          <p class="location">
            <img class="icon pin" src="../../assets/slices/ic_location@3x.png" alt="location pin" />{{
              store.selectedHouse.location.zip
            }}
            {{ store.selectedHouse.location.city }}
          </p>
          <div class="icons1">
            <img class="icon" src="../../assets/slices/ic_price@3x.png">
            <p class="listingInfo singleValue">{{ store.selectedHouse.price }} </p>
            <img class="icon" src="../../assets/slices/ic_size@3x.png">
            <p class="listingInfo singleValue">{{ store.selectedHouse.size }} m2</p>
            <img class="icon" src="../../assets/slices/ic_construction_date@3x.png">
            <p class="listingInfo singleValue">Built in {{ store.selectedHouse.constructionYear }} </p>
          </div>
          <div class="icons2">
            <img class="icon" src="../../assets/slices/ic_bed@3x.png">
            <p class="listingInfo singleValue ">{{ store.selectedHouse.rooms.bedrooms }}</p>
            <img class="icon" src="../../assets/slices/ic_bath@3x.png">
            <p class="listingInfo singleValue">{{ store.selectedHouse.rooms.bathrooms }}</p>
            <img class="icon" src="../../assets/slices/ic_garage@3x.png">
            <p class="listingInfo singleValue">{{ store.selectedHouse.rooms.hasGarage ? 'yes' : 'no' }}</p>
          </div>
          <DeleteEditButt v-if="store.selectedHouse.madeByMe" :id="store.selectedHouse.id" class="deleteAndEdit desk" />
          <DeleteEditButt v-if="store.selectedHouse.madeByMe" :id="store.selectedHouse.id" :whiteIcons="true"
            class="deleteAndEdit mob" />
        </div>
        <p>{{ store.selectedHouse.description }}</p>
      </div>
    </section>
    <section class="recommendations">
      <h1 class="recommended">Recommended for you</h1>
      <HouseList :isRecommend="true" />
    </section>
  </div>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 50px;
}

.houseCoverMob {
  display: none;
}

h1.recommended {
  margin-top: 0;
}

.arrowmob {
  display: none;
}

.container .detail {
  background-color: var(--element-BACKGROUND);
  margin-bottom: 15%;
}

.container .detail .houseCoverDesk {
  width: 100%;
  min-width: 600px;
}

.container .detail .info {
  padding: 30px;
  background-color: var(--element-BACKGROUND);
  display: grid;
  grid-template-rows: 1fr auto;
}

.container .detail .info .name-Icons {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto auto;
  grid-template-areas: ' name delete'
    'icons1 .'
    'icons2 .'
    'icons3 .';
}

.icon {
  width: 18px;
  height: 18px;
  margin: 10px 10px 16px 0;
}

.location {
  grid-area: icons1;
}

.location .icon.pin {
  margin-bottom: 0;
}

.icons1 {
  grid-area: icons2;
  display: flex;
}

.icons2 {
  grid-area: icons3;
  display: flex;
}

.listingInfo,
.singleValue {
  margin: 10px 16px 0 0;
}

.deleteAndEdit button {
  background-color: transparent;
}

.deleteAndEdit.desk {
  align-self: center;
  grid-area: delete;
}

.deleteAndEdit.mob {
  display: none;
}

.container .recommendations {
  min-width: 450px;
  width: 80%;
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

.loadText {
  margin: auto;
  text-align: center;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

@media (max-width: 500px) {
  .arrowdesk {
    display: none;
  }

  .arrowmob {
    display: contents;
  }

  .container.mob {
    border-radius: 30px 30px 0 0;
    background-color: var(--element-BACKGROUND-dark);
    display: grid;
    grid-template-rows: auto auto;
    grid-template-areas: 'info info'
      'recommendations recommendations';
    gap: 5px;
    position: relative;
    top: 300px;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    max-width: 100vw;
    position: relative;
    right: 50%;
    width: 100vw;
  }

  .container.mob .detail {
    grid-area: info;
    background-color: transparent;
    border-radius: 30px 30px 0 0;
    margin-bottom: 5px;
    height: fit-content;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    max-width: 100vw;
    position: relative;
    right: 50%;
    width: 100vw;
  }


  .houseCoverDesk {
    display: initial;
    width: 110%;
    min-width: 100px;
    margin: 0;
    position: fixed;
    left: 0;
    right: 0;
    top: -20px;
    z-index: -1;
  }

  .container.mob .detail .info {
    border-radius: 30px 30px 0 0;
    padding: 25px;
  }

  .container .detail .info .name-Icons {
    grid-template-rows: auto auto 30px 30px;
  }

  .icon {
    width: 14px;
    height: 14px;
    margin: 10px 10px 16px 0;
  }

  .icon.pin {
    width: 14px;
    height: 14px;
    margin: 10px 10px 0 0;
  }

  .location {
    margin-top: 0;
    margin-bottom: 0;
  }

  .container.mob .recommendations {
    grid-area: recommendations;
    min-width: 350px;
    width: 100%;
    height: 350px;
    overflow: scroll;
    padding-bottom: 90px;
    padding-left: 20px;
    left: 50%;
    margin-left: -50vw;
    margin-right: -5vw;
    max-width: 90vw;
    position: relative;
    right: 50%;
    width: 100vw;
  }

  .container.mob .recommendations h1 {
    padding-bottom: 10px;
    position: sticky;
    top: 0;
    background-color: var(--element-BACKGROUND-dark);
    z-index: 1;
    box-shadow: 5px 5px 35px 28px rgb(255, 255, 255);
  }

  .deleteAndEdit.desk {
    display: none;
  }

  .deleteAndEdit.mob {
    display: inline;
    position: fixed;
    top: 35px;
    transform: scale(1.3);
  }
}
</style>

