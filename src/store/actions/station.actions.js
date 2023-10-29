import { store } from '../store.js'
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

import { stationService } from '../../services/station.service.local.js'
import { bgcService } from '../../services/bgc.service.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'

// import { userService } from '../../services/user.service.js'

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
		return stations
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
	try {
		const station = await stationService.getById(stationId)
		station.songs.push(song)
		updateStation(station)
		showSuccessMsg(`Added to ${station.name}`)
	} catch (err) {
		throw err
	}
}

export async function setBgc(bgc) {
	store.dispatch({ type: SET_BGC, bgc })
}

export async function getBgc(imgUrl) {
	// console.log(imgUrl)
	try {
		const color = await bgcService.getColorFromUrl(imgUrl)
		console.log(color)
		// changePrimaryClr(color)
		setBgc(color)
	} catch (err) {
		console.log('Could not load color', err)
	}
}
