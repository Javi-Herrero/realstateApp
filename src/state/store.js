import { apiCommunication } from '../API/apiCommunication'
import { defineStore } from 'pinia'
export const useStore = defineStore({
  id: 'state',
  state: () => ({
    alert: false,
    houseToDelete: null,
    searchBar: '',
    activeTab: 'home',
    sortBy: 'price',
    selectedHouse: null,
    filteredHouses: null,
    newHouse: {
      price: '',
      bedrooms: '',
      bathrooms: '',
      size: '',
      streetName: '',
      houseNumber: '',
      numberAddition: '',
      zip: '',
      city: '',
      constructionYear: '',
      hasGarage: '',
      description: '',
      post: 'inactive'
    },
    newImage: '',
    houseList: 'loading',
    editHouseId: '',
    showThisHouse: '',
  }),
  getters: {
    showHouseList: (state) => {//i included the sort function in here so that they show up allways sorted by the selected sorting method
      const sort = (by) => {
        const sortBy = (by) => (a, b) => a[by] - b[by]
        state.houseList.sort(sortBy(by))
      }
      if (state.houseList !== 'loading') { if (state.sortBy === 'price') { sort('price') } else { sort('size') } }
      return state.houseList
    },
    filteredSortedHouses: (state) => {//also shows the filtered and sorted houses
      const sort = (by) => {
        const sortBy = (by) => (a, b) => a[by] - b[by]
        state.filteredHouses.sort(sortBy(by))
      }
      if (state.filteredHouses !== null) { if (state.sortBy === 'price') { sort('price') } else { sort('size') } }
      return state.filteredHouses
    },
    searchInput: (state) => state.searchBar.toUpperCase().split(' '),
    searchableWords: (state) => {
      let searchableWords = []
      state.houseList.forEach(e => {
        searchableWords.push({
          data: e.location.street.toUpperCase().concat(' ')
            .concat(e.location.city.toUpperCase().concat(' '))
            .concat(e.location.zip.toUpperCase().concat(' '))
            .concat(e.price.toString().concat(' '))
            .concat(e.size.toString().concat(' ')),
          id: e.id
        })
      })
      return searchableWords
    },
  },
  actions: {
    /*  METHODS TO ADD EDIT AND DELETE HOUSES    */
    getData() {//fetch data from API, then show it in home page
      apiCommunication('https://api.intern.d-tt.nl/api/houses', 'GET', null, 'show')
    },
    selectHouse(id) {//this functions takes the chosen house and shows the detail page for that house to the user
      this.selectedHouse = this.houseList.find(item => {
        return item.id === id
      })
      this.showDataToEditHouse()//and here it prepares the data of the selected house to be usable for the edit form 
    },
    deselectHouse() {
      this.newHouse = {
        price: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        streetName: '',
        houseNumber: '',
        numberAddition: '',
        zip: '',
        city: '',
        constructionYear: '',
        hasGarage: '',
        description: '',
        post: 'inactive'
      }
      this.newImage = null
      this.newImageBlob = null
    },
    showDataToEditHouse() {
      //PREPARE THE DATA TO SHOW IN THE EDIT FORM SO ALL THE FIELDS ARE FILLED IN CORRECTLY 
      let location = this.selectedHouse.location.street.split(' ')
      let addition
      let numberAndAddition
      let number = []
      let name = []
      location.forEach(e => !/^[a-zA-Z]+$/.test(e) ? numberAndAddition = e : name.push(e))
      numberAndAddition.split('').forEach(e => !/^[0-9]+$/.test(e) ? addition = e : number.push(e))
      if (addition === undefined) addition = ''
      name = name.toString().replace(/,/g, ' ')
      number = number.toString().replace(',', '')
      this.newHouse = {
        id: this.selectedHouse.id,
        price: this.selectedHouse.price,
        bedrooms: this.selectedHouse.rooms.bedrooms,
        bathrooms: this.selectedHouse.rooms.bathrooms,
        size: this.selectedHouse.size,
        streetName: name,
        houseNumber: number,
        numberAddition: addition,
        zip: this.selectedHouse.location.zip,
        city: this.selectedHouse.location.city,
        constructionYear: this.selectedHouse.constructionYear,
        hasGarage: this.selectedHouse.hasGarage,
        description: this.selectedHouse.description,
        post: ''
      }
      this.newImage = this.selectedHouse.image
      this.newImageBlob = null
    },

    addHouse(id) {
      let formData = new FormData()
      for (const key in this.newHouse) {
        formData.append(key, this.newHouse[key])
      }
      /* ADD HOUSE TO API, then add picture to the created house*/
      let url
      id ? url = `https://api.intern.d-tt.nl/api/houses/${id}` : url = 'https://api.intern.d-tt.nl/api/houses'
      apiCommunication(url, 'POST', formData, 'addPic')
    },

    editHouse(id) {
      this.editHouseId = id
      this.addHouse(id)
    },

    deleteHouse() {
      apiCommunication(`https://api.intern.d-tt.nl/api/houses/${this.houseToDelete}`, 'DELETE', null, 'showWithoutDeleted')
    },
    /* ADD AND DELETE PICTURE LOCALLY, (NOT TO THE API) BEFORE SENDING IT*/
    addPicture(src, blob) {
      this.newImage = src
      this.newImageBlob = blob
    },

    deletePicture() {
      this.newImage = null
      this.newImageBlob = null
    },

    showFilteredHouses(houses) {
      this.filteredHouses = houses
    },

    clearInput() {
      this.searchBar = ''
      this.filteredHouses = null
    },
    showAlert(id) {
      this.alert = !this.alert
      if (this.alert) this.houseToDelete = id
      if (id === 'delete') this.deleteHouse(this.houseToDelete)
    },

  }
})