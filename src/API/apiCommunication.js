import { useStore } from '../state/store'
const apiKey = 'gK9ZbOqohTuS6awk3R7M_n4vNVX0Isc1'
const houseToBeShown = (result) => {
    const store = useStore()
    if (result.some(e => e.image === null)) {
        return result.find(e => e.image === null).id
    } else {
        return store.editHouseId
    }
}
const sendPicture = (result) => {
    const store = useStore()
    let houseToAddPic = houseToBeShown(result)
    console.log(houseToAddPic)
    store.showThisHouse = houseToAddPic
    let formData = new FormData()
    formData.append('image', store.newImageBlob, 'name')
    apiCommunication(`https://api.intern.d-tt.nl/api/houses/${houseToAddPic}/upload`, 'POST', formData, 'gethouseWithPic')
}

export const apiCommunication = (url, method, data, action) => {
    const store = useStore()
    //this function manages the api calls depending on the parameters it receives.
    // the last parameter(action), determines which is the follow action that needs to be done. 
    //It accepts either Show, gethouseWithPic, showWithoutDeleted  or addPic when called. internally it also uses another action ('addPicStep2)but only when it calls itself. 
    //In this way, when a house is added, several actions follow
    // in order to post the house, add the image and finally show the new data to the user
    let options = {
        method: method,
        headers: { 'X-Api-Key': apiKey, },
        redirect: 'follow',
    }
    if (data) options.body = data
    fetch(url, options)
        .then(response => {
            if (action === 'show' || action === 'addPicStep2') {
                return response.json()
            } else if (action === 'addPic') {
                apiCommunication('https://api.intern.d-tt.nl/api/houses', 'GET', null, 'addPicStep2')//here 'addPicStep2' is used by the function itself
            } else if (action === 'showWithoutDeleted') {
                apiCommunication('https://api.intern.d-tt.nl/api/houses', 'GET', null, 'show')
            } else if (action === 'gethouseWithPic') {
                apiCommunication('https://api.intern.d-tt.nl/api/houses', 'GET', null, 'showWithPic')
            } else if (action === 'showWithPic') {
                return response.json()
            }
            else { throw Error("apiCommunication's last parameter has to be either Show or addPic") }
        })
        .then(result => {
            switch (action) {
                case 'show':
                    store.houseList = result
                    break;
                case 'addPicStep2':
                    sendPicture(result)
                    break;
                case 'showWithPic':
                    store.houseList = result
                    store.selectHouse(store.showThisHouse)
                    break;
            }
        })
        .catch(error => console.log('error', error))
}
