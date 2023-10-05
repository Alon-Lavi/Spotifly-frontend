export const SET_SONG_PROGRESS = 'SET_SONG_PROGRESS'
export const SET_CURR_SONG = 'SET_CURR_SONG'
export const SET_NEXT_SONG = 'SET_NEXT_SONG'
export const SET_PREV_SONG = 'SET_PREV_SONG'
export const IS_PLAYING = 'IS_PLAYING'
export const REMOVE_SONG = 'REMOVE_SONG'

const initialState = {
	currSong: {},
	nextSong: undefined,
	prevSong: undefined,
	isPlaying: false,
	songProgress: 0,
}

export function playerReducer(state = initialState, action) {
	var newState = state
	switch (action.type) {
		case SET_CURR_SONG:
			newState = { ...state, song: action.currSong }
			break
		case IS_PLAYING:
			newState = { ...state, isPlaying: action.isPlaying }
			break
		case SET_NEXT_SONG:
			newState = { ...state, nextSong: action.nextSong }
			break
		case SET_PREV_SONG:
			newState = { ...state, prevSong: action.prevSong }
			break
		// case REMOVE_SONG:
		//     newState = {
		//         ...state,
		//         songs: state.songs.filter(song => song._id !== action.songId) // songs? how to get to remove the song from the station?
		//     }
		// break
		case SET_SONG_PROGRESS:
			newState = { ...state, songProgress: action.songProgress }
			break
		default:
	}
	return newState
}

// export const SET_SONG = 'SET_SONG'
// export const PAUSE_SONG = 'PAUSE_SONG'
// export const SET_PLAYER = 'SET_PLAYER'
// export const TOGGLE_IS_PLAYING = 'TOGGLE_IS_PLAYING'
// export const SET_PLAYER_SONGS = 'SET_PLAYER_SONGS'
// export const SET_IDX_SONG = 'SET_IDX_SONG'
// export const SET_SHUFFLE_SONGS = 'SET_SHUFFLE_SONGS'
// export const SET_SHUFFLE = 'SET_SHUFFLE'
// export const SET_SONG_OBJECT = 'SET_SONG_OBJECT'

// const initialState = {
// 	isPlaying: false,
// 	currSongId: '',
// 	currSongIdx: 0,
// 	currStationId: '',
// 	currSongs: [],
// 	isShuffle: false,
// 	shuffleSongs: [],
// 	songDetails: '',
// }

// export function playerReducer(state = initialState, action) {
// 	var newState = state
// 	switch (action.type) {
// 		case SET_SONG:
// 			newState = { ...state, currSongId: action.currSongId }
// 			break
// 		case PAUSE_SONG:
// 			newState = { ...state, currSongId: action.currSongId }
// 			break
// 		case SET_PLAYER:
// 			newState = { ...state, player: action.player }
// 			break
// 		case TOGGLE_IS_PLAYING:
// 			newState = { ...state, isPlaying: action.isPlaying }
// 			break
// 		case SET_PLAYER_SONGS:
// 			newState = { ...state, currSongs: action.currSongs, currStationId: action.currStationId }
// 			break
// 		case SET_IDX_SONG:
// 			newState = { ...state, currSongIdx: action.currSongIdx }
// 			break
// 		case SET_SHUFFLE_SONGS:
// 			newState = { ...state, shuffleSongs: action.shuffleSongs }
// 			break
// 		case SET_SHUFFLE:
// 			newState = { ...state, isShuffle: action.isShuffle }
// 			break
// 		case SET_SONG_OBJECT:
// 			newState = { ...state, songDetails: action.songDetails }
// 			break

// 		default:
// 	}
// 	return newState
// }
