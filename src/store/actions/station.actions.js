import { stationService } from '../../services/station.service.local.js'
import { store } from '../store.js'
import { userService } from '../../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import {
	ADD_STATION,
	REMOVE_SONG,
	REMOVE_STATION,
	SET_BGC,
	SET_CURRENT_STATION,
	SET_SEARCHERS,
	SET_STATIONS,
	UPDATE_STATION,
} from '../reducer/station.reducer.js'

// Action Creators:
export function getActionRemoveStation(stationId) {
	return {
		type: REMOVE_STATION,
		stationId,
	}
}

export function getActionAddStation(station) {
	return {
		type: ADD_STATION,
		station,
	}
}

export function getActionUpdateStation(station) {
	return {
		type: UPDATE_STATION,
		station,
	}
}

export function setCurrStation(currStation) {
	store.dispatch({ type: SET_CURRENT_STATION, currStation })
}

export function setSongsToSearch(songs) {
	store.dispatch({ type: SET_SEARCHERS, songs })
}

export async function removeSong(songId, currStation) {
	try {
		stationService.removeSong(songId, currStation)
		await store.dispatch({ type: REMOVE_SONG, currStation })
	} catch (err) {
		console.log('Could not remove song')
	}
}

export async function loadStations(filterBy) {
	try {
		const stations = await stationService.query(filterBy)
		console.log('Stations from DB:', stations)
		store.dispatch({
			type: SET_STATIONS,
			stations,
		})
	} catch (err) {
		console.log('Cannot load stations', err)
		throw err
	}
}

export async function removeStation(stationId) {
	try {
		await stationService.remove(stationId)
		store.dispatch(getActionRemoveStation(stationId))
	} catch (err) {
		console.log('Cannot remove station', err)
		throw err
	}
}

export async function addStation(station) {
	try {
		const savedStation = await stationService.save(station)
		setCurrStation(savedStation)
		return savedStation
	} catch (err) {
		console.log('Cannot add station', err)
		throw err
	}
}

export async function updateStation(station) {
	try {
		const savedStation = await stationService.save(station)
		if (station.name !== 'Liked Songs') setCurrStation(savedStation)
		return savedStation
	} catch (err) {
		console.log('Cannot save station', err)
		throw err
	}
}

export async function addSongToStation(song, stationId) {
	const station = await stationService.getById(stationId)
	station.songs.push(song)
	updateStation(station)
}

export async function setBgc(bgc){
	store.dispatch({ type: SET_BGC, bgc })
}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveStationOptimistic(stationId) {
//     store.dispatch({
//         type: REMOVE_STATION,
//         stationId
//     })
//     showSuccessMsg('Station removed')

//     stationService.remove(stationId)
//         .then(() => {
//             console.log('Server Reported - Deleted Successfully')
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove station')
//             console.log('Cannot load stations', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_STATION,
//             })
//         })
// }
