import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import { SOCKET_EMIT_UPDATE_STATION, socketService } from './socket.service.js'
import { updateStation } from '../store/actions/station.actions.js'

const STORAGE_KEY = 'station'
const BASE_URL = 'station/'

export const stationService = {
	query,
	getById,
	save,
	remove,
	removeSong,
	removeFromLikedSongsStation,
	addToLikedSongsStation,
	getEmptyStation,
}
window.cs = stationService

async function query(filterBy = {}) {
	try {
		return await httpService.get(BASE_URL, filterBy)
	} catch (err) {
		console.log('Could not filter')
		throw err
	}
}

async function getById(stationId) {
	try {
		return httpService.get(BASE_URL + stationId)
	} catch (err) {
		console.log('Could not get station')
		throw err
	}
}

function removeSong(songId, station) {
	const updatedSongs = station.songs.filter((song) => song._id !== songId)
	station.songs = updatedSongs
	return save(station)
}

async function remove(stationId) {
	try {
		const stationToDelete = await getById(stationId)
		if (stationToDelete.name === 'Liked Songs') return
		return httpService.delete(BASE_URL + stationId)
	} catch (err) {
		console.log('Could not remove station')
		throw err
	}
}

async function save(station) {
	console.log(station, 'from save in service')
	var savedStation
	try {
		if (station._id) {
			savedStation = await httpService.put(BASE_URL + station._id, station)
			// socketService.emit(SOCKET_EMIT_UPDATE_STATION, station)
		} else {
			savedStation = await httpService.post(BASE_URL, station)
		}
		return savedStation
	} catch (err) {
		console.log('Could not save station')
		throw err
	}
}

function removeFromLikedSongsStation(likedSong, likedSongsStation) {
	const updatedSongs = likedSongsStation.songs.filter((song) => song._id !== likedSong._id)
	const updatedStation = { ...likedSongsStation, songs: updatedSongs }
	return updateStation(updatedStation)
}

function addToLikedSongsStation(likedSong, likedSongsStation) {
	likedSongsStation.songs.push(likedSong)
	return updateStation(likedSongsStation)
}

function getEmptyStation() {
	return {
		name: 'My playlist #1 ',
		description: '',
		tags: [],
		createdBy: {
			owner: 'admin',
			imgUrl: 'someImg.jpg',
		},
		likedByUsers: [],
		songs: [],
	}
}
