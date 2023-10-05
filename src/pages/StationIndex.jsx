import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStations, addStation, updateStation, removeStation } from '../store/actions/station.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { stationService } from '../services/station.service.local.js'
import { StationList } from '../cmps/StationList.jsx'
import { RecomendedList } from '../cmps/RecomendedList.jsx'

export function StationIndex() {
	const stations = useSelector((storeState) => storeState.stationModule.stations)
	const [recomended, setRecomended] = useState()

	useEffect(() => {
		loadStations()
		loadRecomended()
	}, [])


	async function loadRecomended() {
		try {
			const getRecomended = await stationService.query({ isRecomended: true })
			setRecomended(getRecomended)
		} catch (error) {
			showErrorMsg('Cannot get station')
		}
	}

	

	if (!recomended || !stations) return <div>loading </div>
	return (
		<div>
			<main className='main-container'>
				<RecomendedList recomended={recomended} />
				<StationList  stations={stations} />
			</main>
		</div>
	)
}
