
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'station'

export const StationService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    addCarMsg
}
window.cs = StationService


async function query(filterBy = { txt: '', price: 0 }) {
    var stations = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stations = stations.filter(station => regex.test(station.vendor) || regex.test(station.description))
    }
    if (filterBy.price) {
        stations = stations.filter(station => station.price <= filterBy.price)
    }
    return stations
}

function getById(sattionId) {
    return storageService.get(STORAGE_KEY, sattionId)
}

async function remove(sattionId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, sattionId)
}

async function save(station) {
    var savedCar
    if (station._id) {
        savedCar = await storageService.put(STORAGE_KEY, station)
    } else {
        // Later, owner is set by the backend
        station.owner = userService.getLoggedinUser()
        savedCar = await storageService.post(STORAGE_KEY, station)
    }
    return savedCar
}

async function addCarMsg(sattionId, txt) {
    // Later, this is all done by the backend
    const station = await getById(sattionId)
    if (!station.msgs) station.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    station.msgs.push(msg)
    await storageService.put(STORAGE_KEY, station)

    return msg
}

function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




