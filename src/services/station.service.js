
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'station'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    addCarMsg
}
window.cs = stationService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(sattionId) {
    return httpService.get(`station/${sattionId}`)
}

async function remove(sattionId) {
    return httpService.delete(`station/${sattionId}`)
}
async function save(station) {
    var savedCar
    if (station._id) {
        savedCar = await httpService.put(`station/${station._id}`, station)

    } else {
        savedCar = await httpService.post('station', station)
    }
    return savedCar
}

async function addCarMsg(sattionId, txt) {
    const savedMsg = await httpService.post(`station/${sattionId}/msg`, {txt})
    return savedMsg
}


function getEmptyStation() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





