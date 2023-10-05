import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

// import { httpService } from './http.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'songDB'

export const songService = {
	query,
	getById,
	save,
	remove,
	// addSongMsg
}
window.cs = songService

async function query(filterBy = { txt: '' }) {
	let songs = await storageService.query(STORAGE_KEY)
	if (filterBy.txt) {
		const regex = new RegExp(filterBy.txt, 'i')
		songs = songs.filter((song) => regex.test(song.name))
	}
	return songs
	// return httpService.get(STORAGE_KEY, filterBy)
}

async function getById(songId) {
	await storageService.get(STORAGE_KEY, songId)
	// return httpService.get(`song/${songId}`)
}

async function remove(songId) {
	await storageService.remove(STORAGE_KEY, songId)
	// return httpService.delete(`song/${songId}`)
}

async function save(song) {
	let savedSong
	if (song._id) {
		savedSong = await storageService.put(STORAGE_KEY, song)
		// savedSong = await httpService.put(`song/${song._id}`, song)
	} else {
		savedSong = await storageService.post(STORAGE_KEY, song)
		// savedSong = await httpService.post('song', song)
	}
	return savedSong
}

// async function addSongMsg(songId, txt) {
//     const savedMsg = await httpService.post(`song/${songId}/msg`, {txt})
//     return savedMsg
// }
