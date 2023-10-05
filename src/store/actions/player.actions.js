import { songService } from '../../services/song.service.js'
import { stationService } from '../../services/station.service.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { store } from '../store.js'
import { SET_CURR_SONG, IS_PLAYING, SET_NEXT_SONG, SET_PREV_SONG, REMOVE_SONG, SET_SONG_PROGRESS } from '../reducer/player.reducer.js'

// Action Creators:
export function getActionIsPlaying(isPlaying) {
	return {
		type: IS_PLAYING,
		isPlaying,
	}
}

export function getActionCurrSong(song) {
	return {
		type: SET_CURR_SONG,
		song,
	}
}

export function getActionNextSong(song) {
	return {
		type: SET_NEXT_SONG,
		song,
	}
}

export function getActionPrevSong(song) {
	return {
		type: SET_PREV_SONG,
		song,
	}
}

export function getActionRemoveSong(songId) {
	return {
		type: REMOVE_SONG,
		songId,
	}
}

export function getActionSetSongProgress(songProgress) {
	return {
		type: SET_SONG_PROGRESS,
		songProgress,
	}
}

export async function toggleIsPlaying(isPlaying) {
	try {
		store.dispatch(getActionIsPlaying(!isPlaying))
		return !isPlaying
	} catch (err) {
		console.log('cannot play or pause', err)
		throw err
	}
}

export async function setCurrSong(song) {
	try {
		store.dispatch(getActionCurrSong(song))
		return song
	} catch (err) {
		console.log('cannot play or pause', err)
		throw err
	}
}

export async function setNextSong(song) {
	try {
		const nextSong = await stationService.query(song)
		store.dispatch(getActionNextSong(nextSong))
		return nextSong
	} catch (err) {
		console.log('cannot play next song', err)
		throw err
	}
}

export async function setPrevSong(song) {
	try {
		const prevSong = await stationService.query(song)
		store.dispatch(getActionPrevSong(prevSong))
		return prevSong
	} catch (err) {
		console.log('cannot play next song', err)
		throw err
	}
}

export async function removeSong(songId) {
	try {
		await stationService.remove(songId)
		store.dispatch(getActionRemoveSong(songId))
	} catch (err) {
		console.log('Cannot remove song from player', err)
		throw err
	}
}

export async function setSongProgress(songProgress) {
	try {
		store.dispatch(getActionSetSongProgress(songProgress))
	} catch (err) {
		console.log('Cannot change song progress', err)
		throw err
	}
}

// import { store } from '../store.js'
// import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
// import {
// 	SET_SONG,
// 	PAUSE_SONG,
// 	SET_PLAYER,
// 	TOGGLE_IS_PLAYING,
// 	SET_PLAYER_SONGS,
// 	SET_IDX_SONG,
// 	SET_SHUFFLE_SONGS,
// 	SET_SHUFFLE,
// 	SET_SONG_OBJECT,
// } from '../reducer/music.player.reducer.js'

// // Action Creators:
// export function getActionSetSong(currSongId) {
// 	return {
// 		type: SET_SONG,
// 		currSongId,
// 	}
// }

// export function getActionPauseSong(currSongId) {
// 	return {
// 		type: PAUSE_SONG,
// 		currSongId,
// 	}
// }

// export function getActionSetPlayer(player) {
// 	return {
// 		type: SET_PLAYER,
// 		player,
// 	}
// }

// export function getActionToggleIsPlaying(isPlaying) {
// 	return {
// 		type: TOGGLE_IS_PLAYING,
// 		isPlaying,
// 	}
// }

// export function getActionSetPlayerSongs(currStationId, currSongs) {
// 	return {
// 		type: SET_PLAYER_SONGS,
// 		currStationId,
// 		currSongs,
// 	}
// }

// export function getActionSetIdxSong(currSongIdx) {
// 	return {
// 		type: SET_IDX_SONG,
// 		currSongIdx,
// 	}
// }

// export function getActionSetShuffleSongs(shuffleSongs) {
// 	return {
// 		type: SET_SHUFFLE_SONGS,
// 		shuffleSongs,
// 	}
// }

// export function getActionSetShuffle(isShuffle) {
// 	return {
// 		type: SET_SHUFFLE,
// 		isShuffle,
// 	}
// }

// export function getActionSetSongObject(songDetails) {
// 	return {
// 		type: SET_SONG_OBJECT,
// 		songDetails,
// 	}
// }
