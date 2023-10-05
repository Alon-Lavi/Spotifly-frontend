// import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import {
	SET_SONG,
	PAUSE_SONG,
	SET_PLAYER,
	TOGGLE_IS_PLAYING,
	SET_PLAYER_SONGS,
	SET_IDX_SONG,
	SET_SHUFFLE_SONGS,
	SET_SHUFFLE,
	SET_SONG_OBJECT,
} from '../reducer/music.player.reducer.js'

// Action Creators:
export function getActionSetSong(currSongId) {
	return {
		type: SET_SONG,
		currSongId,
	}
}

export function getActionPauseSong(currSongId) {
	return {
		type: PAUSE_SONG,
		currSongId,
	}
}

export function getActionSetPlayer(player) {
	return {
		type: SET_PLAYER,
		player,
	}
}

export function getActionToggleIsPlaying(isPlaying) {
	return {
		type: TOGGLE_IS_PLAYING,
		isPlaying,
	}
}

export function getActionSetPlayerSongs(currStationId, currSongs) {
	return {
		type: SET_PLAYER_SONGS,
		currStationId,
		currSongs,
	}
}

export function getActionSetIdxSong(currSongIdx) {
	return {
		type: SET_IDX_SONG,
		currSongIdx,
	}
}

export function getActionSetShuffleSongs(shuffleSongs) {
	return {
		type: SET_SHUFFLE_SONGS,
		shuffleSongs,
	}
}

export function getActionSetShuffle(isShuffle) {
	return {
		type: SET_SHUFFLE,
		isShuffle,
	}
}

export function getActionSetSongObject(songDetails) {
	return {
		type: SET_SONG_OBJECT,
		songDetails,
	}
}
