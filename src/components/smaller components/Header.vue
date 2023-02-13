<script setup>

import { useStore } from '../../state/store'
const store = useStore()
const sort = (by) => {
  const sortBy = (by) => (a, b) => a[by] - b[by]
  store.filteredHouses ? store.filteredHouses.sort(sortBy(by)) : store.houseList.sort(sortBy(by))
}
const search = () => {
  let filteredHouses = []
  let keyWord = store.searchInput
  store.searchableWords.forEach(e => {
    if (e.data.match(keyWord)) {
      let house
      store.showHouseList.forEach(item => {
        if (item.id === e.id) house = item
      })
      filteredHouses.push(house)
    }
  })
  store.showFilteredHouses(filteredHouses)
  if (store.searchBar === '') store.clearInput()
}
</script>
<template>
  <div class="buttonsAndBar">
    <h1 class="houses"> Houses </h1>
    <router-link to="/new" id="new">
      <button @click="store.deselectHouse()" class="desk">+ CREATE NEW</button>
    </router-link>
    <router-link to="/new" id="new">
      <button @click="store.deselectHouse()" class="mob">+ CREATE NEW</button>
    </router-link>
    <span class="search">
      <input @input="search()" v-model="store.searchBar" id="bar" placeholder="Search for a house">
      <button v-if="store.searchBar !== ''" @click="store.clearInput()" class="clearInput"></button>
    </span>
    <div class="buttons">
      <button id="price" @click="(store.sortBy = 'price'), sort('price')"
        :class="[store.sortBy === 'size' ? 'inactive' : '']">Price</button>
      <button id="size" @click="(store.sortBy = 'size'), sort('size')"
        :class="[store.sortBy === 'price' ? 'inactive' : '']">Size</button>
    </div>
  </div>
</template>
<style scoped>
.buttonsAndBar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    ' houses new '
    ' bar buttons ';
  align-items: center;
  justify-items: center;
}

.houses {
  grid-area: houses;
  justify-self: start;
}

.buttonsAndBar #new {
  grid-area: new;
  justify-self: end;
}

.buttonsAndBar #new button {
  width: 200px;
}

.buttonsAndBar #new button.mob {
  display: none;
}


.buttonsAndBar .search {
  grid-area: bar;
  justify-self: start;
}

.buttons {
  display: flex;
  grid-area: buttons;
  justify-self: end;
}

.buttons .inactive {
  background-color: var(--element-SECONDARY-2);
}

.buttons #price {
  border-radius: 8px 0px 0px 8px;
  width: 150px;
}

.buttons #size {
  border-radius: 0px 8px 8px 0px;
  width: 150px;
}

button:active {
  background-color: var(--element-btnSel);
}

.clearInput {
  position: relative;
  left: -30px;
  background-image: url('../../assets/slices/ic_clear@3x.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent;
}

.clearInput:active {
  background-color: transparent;
}

.search {
  display: flex;
  width: 75%;
}



input {
  width: 100%;
  background-color: var(--element-TERTIARY);
  background-image: url('../../assets/slices/ic_search@3x.png');
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: 2.5% 50%;
  text-indent: 35px;
  transition: 250ms;
  border: none;
  border-radius: 8px;
  padding: 12px 12px;
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: var(--reg);
  color: var(--text-SECONDARY);
}

input:focus {
  background-image: none;
  text-indent: 0px;
}

@media (max-width: 500px) {
  .buttonsAndBar {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      ' houses-new '
      ' bar'
      ' buttons ';
    align-items: center;
    justify-items: center;
    min-width: 280px;
  }

  .houses {
    grid-area: houses-new;
    justify-self: center;
  }

  .buttonsAndBar #new {
    grid-area: houses-new;
    justify-self: end;

  }

  .buttonsAndBar #new button.desk {
    display: none;
  }

  .buttonsAndBar #new button.mob {
    background-image: url('../../assets/slices/ic_plus_grey@3x.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 100%;
    display: block;
    font-size: 0;
    background-color: transparent;
    width: 50px;
  }

  .buttonsAndBar .search {
    grid-area: bar;
    justify-self: start;
  }

  .search {
    display: flex;
    width: 100%;
  }

  .buttons {
    display: flex;
    grid-area: buttons;
    width: 100%;
  }

  .buttons #price {
    padding: 8px 8px;
    border-radius: 8px 0px 0px 8px;
    width: 100%;
    margin-bottom: 25px;
  }

  .buttons #size {
    padding: 8px 8px;
    border-radius: 0px 8px 8px 0px;
    width: 100%;
    margin-bottom: 25px;
  }

  input {
    padding: 8px 8px;
  }
}
</style>
