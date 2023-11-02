export const SET_STATIONS = 'SET_STATIONS'
export const SET_CURRENT_STATION = 'SET_CURRENT_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const REMOVE_SONG = 'REMOVE_SONG'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const SET_SEARCHERS = 'SET_SEARCHERS'
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE'

export const UNDO_REMOVE_STATION = 'UNDO_REMOVE_STATION'
export const SET_BGC = 'SET_BGC'

const initialState = {
	stations: [],
	currStation: null,
	searchRes: null,
	songsToSearch: null,
	bgc: null,
	searchValue:null
}

export function stationReducer(state = initialState, action) {
	var newState = state
	var stations

	switch (action.type) {
		case SET_STATIONS:
			newState = { ...state, stations: action.stations }
			break
		case SET_CURRENT_STATION:
			newState = { ...state, currStation: action.currStation }
			break
		case REMOVE_STATION:
			stations = state.stations.filter((station) => station._id !== action.stationId)
			newState = { ...state, stations }
			break
		case REMOVE_SONG:
			newState = { ...state, currStation: action.currStation }
			break
		case ADD_STATION:
			newState = {
				...state,
				stations: [...state.stations, action.station],
			}
			break
		case UPDATE_STATION:
			stations = state.stations.map((station) => (station._id === action.station._id ? action.station : station))
			newState = { ...state, stations, currStation: action.station }
			break
			case SET_SEARCH_VALUE:
				newState = { ...state, searchValue: action.searchValue }
				break
		case SET_SEARCHERS:
			newState = { ...state, songsToSearch: action.songs }
			break
		case SET_BGC:
			newState = { ...state, bgc: action.bgc }
			break
		default:
	}
	return newState
}
