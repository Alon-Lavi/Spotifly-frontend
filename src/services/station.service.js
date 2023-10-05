// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

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

async function query(filterBy = { txt: '' }) {
	return httpService.get(STORAGE_KEY, filterBy)
}

function getById(stationId) {
	return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
	return httpService.delete(`station/${stationId}`)
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

async function addCarMsg(stationId, txt) {
	const savedMsg = await httpService.post(`station/${stationId}/msg`, { txt })
	return savedMsg
}


function getEmptyStation() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}
