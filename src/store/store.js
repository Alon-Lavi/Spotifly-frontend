import { createStore, combineReducers } from 'redux'

import { stationReducer } from './reducer/station.reducer.js'
import { userReducer } from './reducer/user.reducer.js'
import { reviewReducer } from './reducer/review.reducer.js'
import { systemReducer } from './reducer/system.reducer.js'
import { musicPlayerReducer } from './reducer/music.player.reducer.js'

const rootReducer = combineReducers({
	stationModule: stationReducer,
	userModule: userReducer,
	systemModule: systemReducer,
	reviewModule: reviewReducer,
	musicPlayerModule: musicPlayerReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// store.subscribe(() => {
// 	console.log('**** Store state changed: ****')
// 	console.log('storeState:\n', store.getState())
// 	console.log('*******************************')
// })
