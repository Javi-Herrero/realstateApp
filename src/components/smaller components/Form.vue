<script setup>
import { useStore } from '../../state/store'
const store = useStore()
const props = defineProps(['isEdit'])
const formValidation = (e) => {//check if all the inputs are filled with and the correct data 
  if (e) {//first check if streetName,postCode,city & description dont have numbers
    if (e.target.id === 'streetName' || e.target.id === 'city') {
      if (!/[a-zA-Z]/.test(store.newHouse[e.target.id])) {
        e.target.classList.add('invalid')
        e.target.placeholder = 'No numbers allowed'
        document.getElementById('form').classList.add('invalid')
      } else {
        e.target.classList.remove('invalid')
        document.getElementById('form').classList.remove('invalid')
      }
      //then check if price size, bathrooms bedrooms and year, are numbers (optional fields and description are not checked)
    } else if (e.target.id === 'price' || e.target.id === 'size' || e.target.id === 'bedrooms' || e.target.id === 'bathrooms' || e.target.id === 'constructionYear' || e.target.id === 'houseNumber') {
      if (!/^[0-9]+$/.test(store.newHouse[e.target.id])) {
        e.target.classList.add('invalid')
        e.target.placeholder = 'Only numbers allowed'
        document.getElementById('form').classList.add('invalid')
      } else {
        e.target.classList.remove('invalid')
        document.getElementById('form').classList.remove('invalid')
      }
    } else if (e.target.id === 'postCode') {
      if (!/^\d\d\d\d\s[a-zA-Z][a-zA-Z]+$/.test(store.newHouse.zip)) {
        e.target.classList.add('invalid')
        document.getElementById('form').classList.add('invalid')
      } else {
        e.target.classList.remove('invalid')
        document.getElementById('form').classList.remove('invalid')
      }
    }
  }
  //finally check whether all the required fields have been filled
  let emptyFields = document.querySelectorAll('[required]' + ':placeholder-shown').length
  let select = document.querySelector('#garage').selectedIndex
  let validFields = document.querySelectorAll('.invalid').length
  if (emptyFields === 0 && select !== 0 && store.newImage && validFields === 0) {
    store.newHouse.post = 'active'
  } else { store.newHouse.post = 'inactive' }
}
let src
let blob
const showImage = (e) => {
  src = URL.createObjectURL(e.target.files[0])
  blob = e.target.files[0]
  store.addPicture(src, blob)
  formValidation()
}
</script>
<template>
  <img class="background" src="../../assets/slices/img_background@3x.png">
  <div class="holder">
    <form id="form">
      <label class="inputFieldTitle" for="streetName">Street name*</label>
      <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.streetName"
        placeholder='Enter the street name' id="streetName" type="text" required>
      <span></span>
      <div class="blockFields">
        <label class="inputFieldTitle" for="houseNumber">House number*</label>
        <div>
          <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.houseNumber"
            placeholder='Enter house number' id="houseNumber" type="text" required>
          <span></span>
        </div>
        <label class="inputFieldTitle" for="Addition">Addition (optional)</label>
        <div>
          <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.numberAddition"
            placeholder='e.g. A' id="Addition" type="text">
        </div>
      </div>
      <label class="inputFieldTitle" for="postCode">Postal code*</label>
      <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.zip" placeholder='e.g. 1000 AA'
        id="postCode" type="text" required>
      <span></span>
      <label class="inputFieldTitle" for="city">City*</label>
      <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.city" placeholder='e.g. Utrecht'
        id="city" type="text" required>
      <span></span>
      <label class="inputFieldTitle" for="price">Upload picture(PNG or JPG)*</label>
      <div class="showImg">
        <input v-if="!store.newImage" @change="showImage" class="upload inputField" type="file"
          accept="image/jpeg, image/png, image/jpg">
        <img v-if="store.newImage" :src="store.newImage" id="upThum">
        <button v-if="store.newImage" class="deleteImg" @click.prevent="store.deletePicture(), formValidation()" />
      </div>
      <label class="inputFieldTitle" for="price">Price*</label>
      <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.price"
        placeholder='e.g. € 150.000' id="price" type="text" required>
      <span></span>
      <div class="blockFields odd">
        <label class="inputFieldTitle" for="size">Size*</label>
        <div>
          <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.size"
            placeholder='e.g. 60 m2' id="size" type="text" required>
          <span></span>
        </div>
        <label class="inputFieldTitle" for="garage">Garage*</label>
        <div> <select @input="formValidation($event)" v-model="store.newHouse.hasGarage" id="garage" required>
            <option value="" disabled selected hidden>select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div class="blockFields">
        <label class="inputFieldTitle" for="bedrooms">Bedrooms*</label>
        <div> <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.bedrooms"
            placeholder='Enter amount' id="bedrooms" type="text" required>
          <span></span>
        </div>
        <label class="inputFieldTitle" for="bathrooms">Bathrooms*</label>
        <div> <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.bathrooms"
            placeholder='Enter amount' id="bathrooms" type="text" required>
          <span></span>
        </div>
      </div>
      <label class="inputFieldTitle" for="constructionYear">Construction date*</label>
      <input class="inputField" @input="formValidation($event)" v-model="store.newHouse.constructionYear"
        placeholder='e.g. 1990' id="constructionYear" type="text" required>
      <span></span>
      <label class="inputFieldTitle" for="description">Description*</label>
      <textarea @input="formValidation($event)" v-model="store.newHouse.description" placeholder='Enter description'
        id="description" type="text" class="inputField" required />
      <span></span>
    </form>
    <router-link v-if="props.isEdit" :class="store.newHouse.post" @click="store.editHouse(store.newHouse.id)"
      to="/detail">
      <button>SAVE</button>
    </router-link>
    <router-link v-else :class="store.newHouse.post" @click="store.addHouse()" to="/detail">
      <button>POST</button>
    </router-link>
  </div>
</template>
<style scoped>
.background {
  margin: 0;
  position: fixed;
  top: -50px;
  min-height: 1290px;
  width: 100vW;
  min-width: 1024px;
  z-index: -20;
}

form {
  padding: 15px;
  width: 385px;
  display: grid;
}

form .blockFields {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-auto-flow: column;
  column-gap: 40px;
}

input,
select,
textarea {

  margin: 15px 0;
  border: none;
  border-radius: 8px;
  padding: 12px 12px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

a {
  padding: 12px;
  width: 50%;
  justify-self: end;
}

a button {
  width: 100%;
}

a.inactive {

  pointer-events: none;
  opacity: 0.5;
}


input[type="file"] {
  color: transparent;
  width: 120px;
  height: 120px;
}

input[type="file"]::file-selector-button {
  border: var(--element-SECONDARY) dashed 2px;
  background-image: url('../../assets/slices/ic_plus_grey@3x.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 100px;
  color: transparent;
  cursor: pointer;
}


form .invalid {
  border: 2px solid var(--element-PRIMARY);
}

form.invalid::after {
  content: 'Please, fill the required fields before sending the form.';
  color: var(--element-PRIMARY);
  font-family: Montserrat;
  font-size: 14px;
  font-weight: var(--med);
  font-style: italic;
}

input.invalid::placeholder {

  color: var(--element-PRIMARY);
  font-family: Montserrat;
  font-size: 14px;
  font-weight: var(--med);
}

input.invalid+span::before {
  position: relative;
  top: -10px;
  content: 'Required field missing';
  color: var(--element-PRIMARY);
  font-family: Montserrat;
  font-size: 14px;
  font-weight: var(--med);
  font-style: italic;
}

.holder {
  display: grid;
  width: fit-content;
  background-color: transparent;
}

.deleteImg {
  position: relative;
  top: -70%;
  left: -5%;
  background-image: url('../../assets/slices/ic_clear_white@3x.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent;
  width: 30px;
  height: 30px;
}

#upThum {
  padding-top: 20px;
  width: 100px;
  height: 100px;
}

.blockFields.odd {
  grid-template-columns: 169px auto;
}

@media (max-width: 500px) {
  .background {
    display: none;
  }

  form {
    padding: 5px;
    width: 285px;
    display: grid;
  }

  .blockFields.odd {
    grid-template-columns: 120px auto;
  }

  .holder {
    display: grid;
    width: 80%;
    background-color: transparent;
    padding-bottom: 50px;
  }
}
</style>
